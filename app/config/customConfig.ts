//app\config\customConfig.ts

export interface BossConfig {
  type: "fixed" | "relative";
  timer?: number; // Para bosses relativos
  schedule?: { day: number; hour: number; minute: number }[]; // Para bosses con horario fijo
}

export interface customConfig {
  debug: "none" | "normal" | "complete";
  bosses: string[];
  bossConfigs: { [key: string]: BossConfig };
  selectionType: "listbox" | "checkbox";
}

export const defaultConfig: customConfig = {
  debug: "none",
  bosses: [
    "Nix",
    "Nightmare",
    "Lord of Ferea",
    "Selupan",
    "Erohim",
    "God of Darkness",
    "Medusa",
    "Balgass",
    "Lord Silvester",
    "Core Magriffy",
    "Kundun",
  ],
  bossConfigs: {
    // Bosses relativos
    Selupan: { type: "relative", timer: 34 },
    Nightmare: { type: "relative", timer: 40 },
    Nix: { type: "relative", timer: 100 }, //130
    "Core Magriffy": { type: "relative", timer: 84.4 }, //100
    "Lord of Ferea": { type: "relative", timer: 82 },
    "Lord Silvester": { type: "relative", timer: 93 }, //90
    "God of Darkness": { type: "relative", timer: 96 },

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
    },
    Medusa: {
      type: "fixed",
      schedule: [
        { day: 2, hour: 21, minute: 0 }, // Martes
        { day: 5, hour: 21, minute: 0 }, // Viernes
        { day: 6, hour: 16, minute: 0 }, // Sábado
        { day: 0, hour: 18, minute: 0 }, // Domingo
      ],
    },
  },
  selectionType: "listbox",
};
