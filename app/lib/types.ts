import { Temporal } from "@js-temporal/polyfill";

export interface BossData {
  current: BossLogEntry[];
  historical: BossLogEntry[];
  lastUpdate: Temporal.ZonedDateTime;
}
export interface RawBossLogEntry {
  fecha: string;
  monstruo: string;
  jugador: string;
  servidor: string;
  mapa: string;
}
export interface BossLogEntry {
  fecha: Temporal.PlainDateTime;
  monstruo: string;
  jugador: string;
  servidor: number;
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
};

export type BossType = "fixed" | "relative";

export interface BossConfig {
  type: BossType;
  timer?: number;
  schedule?: BossSchedule[];
  mapa: string;
}

export const bosses = [
  "Nix",
  "Nightmare",
  "Lord of Ferea",
  "Selupan",
  "Erohim",
  "God of Darkness",
  "Medusa",
  "Lord Silvester",
  "Core Magriffy",
  "Kundun",
] as const;

export type BossName = typeof bosses[number];

export const bossConfigs: { [key in BossName]: BossConfig } = {
  // Bosses relativos
  Selupan: { type: "relative", timer: 34, mapa: "Raklion" },//34.04
  Nightmare: { type: "relative", timer: 40, mapa: "Kanturu" },
  Nix: { type: "relative", timer: 112, mapa: "Nixies Lake" }, //130
  "Core Magriffy": { type: "relative", timer: 84, mapa: "Nars" }, //100 //84.36
  "Lord of Ferea": { type: "relative", timer: 82, mapa: "Ferea" },
  "Lord Silvester": { type: "relative", timer: 93, mapa: "Urk Mountain" }, //90
  "God of Darkness": { type: "relative", timer: 96, mapa: "Swamp of Darkness" },

  // Bosses con horario fijo
  Kundun: {
    type: "fixed",
    schedule: [
      { day: 1, hour: 16, minute: 0 }, // Lunes
      { day: 2, hour: 4, minute: 0 }, // Martes
      { day: 3, hour: 23, minute: 0 }, // Miércoles
      { day: 4, hour: 2, minute: 0 }, // Jueves
      { day: 5, hour: 16, minute: 0 }, // Viernes
      { day: 6, hour: 21, minute: 0 }, // Sábado
      { day: 0, hour: 2, minute: 0 }, // Domingo
    ],
    mapa: "Kalima",
  },
  Erohim: {
    type: "fixed",
    schedule: [
      { day: 1, hour: 23, minute: 0 }, // Lunes
      { day: 2, hour: 14, minute: 0 }, // Martes
      { day: 3, hour: 4, minute: 0 }, // Miércoles
      { day: 4, hour: 16, minute: 0 }, // Jueves
      { day: 5, hour: 23, minute: 0 }, // Viernes
      { day: 6, hour: 2, minute: 0 }, // Sábado
      { day: 0, hour: 19, minute: 0 }, // Domingo
    ],
    mapa: "",
  },
  Medusa: {
    type: "fixed",
    schedule: [
      { day: 2, hour: 21, minute: 0 }, // Martes
      { day: 5, hour: 21, minute: 0 }, // Viernes
      { day: 6, hour: 16, minute: 0 }, // Sábado
      { day: 0, hour: 18, minute: 0 }, // Domingo
    ],
    mapa: "Swamp of Calm.",
  },
};

export type ServersType = "normal" | "novato" | "megaVip" | "hunt";

export interface ServerGroups {
  [key: string]: number[];
}

export const SERVER_GROUPS: ServerGroups = {
  normal: [1, 2, 3, 4, 5, 6],
  novato: [11, 12, 13],
  megaVip: [15, 16, 17, 18],
  hunt: [19],
};
export type ServerTypeName = keyof typeof SERVER_GROUPS;
