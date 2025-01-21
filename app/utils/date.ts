// utils/date.ts

import { BossSchedule, TimeLeftResult } from "~/types/types";

export function parseDateString(dateStr: string): Date {
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

export function formatDate(date: Date): string {
  return date.toLocaleString('es-AR', { 
    timeZone: 'America/Argentina/Buenos_Aires',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}
export function getNextFixedSpawn(schedule: BossSchedule[], currentDate: Date): Date {
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  // Ordenamos los horarios por día y hora
  const sortedSchedule = [...schedule].sort((a, b) => {
    if (a.day === b.day) {
      return a.hour * 60 + a.minute - (b.hour * 60 + b.minute);
    }
    return a.day - b.day;
  });

  // Buscamos el próximo horario
  const nextSpawn = sortedSchedule.find(spawn => {
    if (spawn.day === currentDay) {
      const spawnTime = spawn.hour * 60 + spawn.minute;
      const currentTime = currentHour * 60 + currentMinute;
      return spawnTime > currentTime;
    }
    return spawn.day > currentDay;
  }) || sortedSchedule[0]; // Si no hay más horarios esta semana, tomamos el primero

  // Calculamos la fecha de la próxima aparición
  const nextDate = new Date(currentDate);
  let daysToAdd = nextSpawn.day - currentDay;
  if (daysToAdd < 0 || (daysToAdd === 0 && (nextSpawn.hour < currentHour || (nextSpawn.hour === currentHour && nextSpawn.minute <= currentMinute)))) {
    daysToAdd += 7;
  }

  nextDate.setDate(nextDate.getDate() + daysToAdd);
  nextDate.setHours(nextSpawn.hour, nextSpawn.minute, 0, 0);

  return nextDate;
}
export function calculateTimeLeft(lastDeathStr: string, bossName: string, currentTime: Date, bossConfigs: any): TimeLeftResult {
  const bossConfig = bossConfigs[bossName];
  if (!bossConfig) {
    return { timeStr: "No configurado", isPast: false };
  }

  try {
    let nextSpawn: Date;
    
    if (bossConfig.type === 'fixed') {
      nextSpawn = getNextFixedSpawn(bossConfig.schedule!, currentTime);
    } else {
      const deathDate = parseDateString(lastDeathStr);
      nextSpawn = new Date(deathDate.getTime() + bossConfig.timer! * 60 * 60 * 1000);
    }
    
    const timeDiff = nextSpawn.getTime() - currentTime.getTime();
    const isPast = timeDiff < 0;
    const diff = Math.abs(timeDiff);
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const timeStr = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return { timeStr, isPast };
  } catch (error) {
    console.error('Error calculating time:', error);
    return { timeStr: "Error de cálculo", isPast: false };
  }
}