import { Temporal } from "@js-temporal/polyfill";
import { BossConfig, BossName, BossSchedule, TimeLeftResult } from "~/lib/types";

export function parseDateString(dateStr: string): Temporal.PlainDateTime {
  const [datePart, timePart] = dateStr.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  return Temporal.PlainDateTime.from({
    year,
    month,
    day,
    hour: hours,
    minute: minutes,
    second: seconds,
  });
}

export function formatDate(date: Temporal.ZonedDateTime): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: date.timeZoneId, // Usamos la zona horaria del ZonedDateTime
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("es-AR");
}

export function getNextFixedSpawn(
  schedule: BossSchedule[],
  currentDate: Temporal.ZonedDateTime
): Temporal.ZonedDateTime {
  const currentDay = currentDate.dayOfWeek - 1; // Temporal: 1-7 (Lunes-Domingo), Date: 0-6 (Domingo-Sábado)
  const currentHour = currentDate.hour;
  const currentMinute = currentDate.minute;

  const sortedSchedule = [...schedule].sort((a, b) => {
    if (a.day === b.day) {
      return a.hour * 60 + a.minute - (b.hour * 60 + b.minute);
    }
    return a.day - b.day;
  });

  const nextSpawn =
    sortedSchedule.find((spawn) => {
      if (spawn.day === currentDay) {
        const spawnTime = spawn.hour * 60 + spawn.minute;
        const currentTime = currentHour * 60 + currentMinute;
        return spawnTime > currentTime;
      }
      return spawn.day > currentDay;
    }) || sortedSchedule[0];

  let nextDate = currentDate.toPlainDate();
  let daysToAdd = nextSpawn.day - currentDay;

  if (
    daysToAdd < 0 ||
    (daysToAdd === 0 &&
      (nextSpawn.hour < currentHour ||
        (nextSpawn.hour === currentHour && nextSpawn.minute <= currentMinute)))
  ) {
    daysToAdd += 7;
  }

  nextDate = nextDate.add({ days: daysToAdd });

  return nextDate.toZonedDateTime({
    timeZone: currentDate.timeZoneId, // timeZone va aquí
    plainTime: {
      hour: nextSpawn.hour, // hour va aquí
      minute: nextSpawn.minute,
    },
  });
}
export function calculateTimeLeft(
  lastDeathStr: Temporal.PlainDateTime,
  bossName: BossName,
  currentTime: Temporal.ZonedDateTime,
  bossConfigs: { [key in BossName]: BossConfig }
): TimeLeftResult {
  const bossConfig = bossConfigs[bossName];
  if (!bossConfig) {
    return { timeStr: "No configurado", isPast: false };
  }

  try {
    let nextSpawn: Temporal.ZonedDateTime;

    if (bossConfig.type === "fixed") {
      nextSpawn = getNextFixedSpawn(bossConfig.schedule!, currentTime);
    } else {
      const deathDate = lastDeathStr.toZonedDateTime(currentTime.timeZoneId);
      nextSpawn = deathDate.add({ hours: bossConfig.timer! });
    }

    const timeDiff =
      nextSpawn.epochMilliseconds - currentTime.epochMilliseconds;
    const isPast = timeDiff < 0;
    const diff = Math.abs(timeDiff);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const timeStr = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    return { timeStr, isPast };
  } catch (error) {
    console.error("Error calculating time:", error);
    return { timeStr: "Error de cálculo", isPast: false };
  }
}
