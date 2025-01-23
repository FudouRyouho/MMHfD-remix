export interface BossLogEntry {
  fecha: string;
  monstruo: string;
  jugador: string;
  servidor: string;
  mapa: string;
}

export interface TimeLeftResult {
  timeStr: string;
  isPast: boolean;
}

export type BossSchedule = {
  day: number; // 0-6 (Domingo-Sábado)
  hour: number;
  minute: number;
}

export type BossType = 'fixed' | 'relative';

export interface BossConfig {
  type: BossType;
  timer?: number; // Para bosses relativos
  schedule?: BossSchedule[]; // Para bosses con horario fijo
}

export const bosses = [
  "Nix", "Nightmare", "Lord of Ferea", "Selupan", "Erohim", 
  "God of Darkness", "Medusa", "Balgass", "Lord Silvester", "Core Magriffy",
  "Kundun"
];

export const bossConfigs: { [key: string]: BossConfig } = {
  // Bosses relativos
  "Selupan": { type: 'relative', timer: 34 },
  "Nightmare": { type: 'relative', timer: 40 },
  "Nix": { type: 'relative', timer: 112 }, //130
  "Core Magriffy": { type: 'relative', timer: 85 }, //100
  "Lord of Ferea": { type: 'relative', timer: 82 },
  "Lord Silvester": { type: 'relative', timer: 93 }, //90
  "God of Darkness": {type: 'relative', timer: 96},
  
  // Bosses con horario fijo
  "Kundun": {
    type: 'fixed',
    schedule: [
      { day: 1, hour: 16, minute: 0 }, // Lunes
      { day: 2, hour: 4, minute: 0 },  // Martes
      { day: 3, hour: 23, minute: 0 }, // Miércoles
      { day: 4, hour: 2, minute: 0 },  // Jueves
      { day: 5, hour: 16, minute: 0 }, // Viernes
      { day: 6, hour: 21, minute: 0 }, // Sábado
      { day: 0, hour: 2, minute: 0 },  // Domingo
    ]
  },
  "Erohim": {
    type: 'fixed',
    schedule: [
      { day: 1, hour: 23, minute: 0 }, // Lunes
      { day: 2, hour: 14, minute: 0 }, // Martes
      { day: 3, hour: 4, minute: 0 },  // Miércoles
      { day: 4, hour: 16, minute: 0 }, // Jueves
      { day: 5, hour: 23, minute: 0 }, // Viernes
      { day: 6, hour: 2, minute: 0 },  // Sábado
      { day: 0, hour: 19, minute: 0 }, // Domingo
    ]
  },
  "Medusa": {
    type: 'fixed',
    schedule: [
      { day: 2, hour: 21, minute: 0 }, // Martes
      { day: 5, hour: 21, minute: 0 }, // Viernes
      { day: 6, hour: 16, minute: 0 }, // Sábado
      { day: 0, hour: 18, minute: 0 }, // Domingo
    ]
  }
};

// Función auxiliar para calcular la próxima aparición de un boss con horario fijo
