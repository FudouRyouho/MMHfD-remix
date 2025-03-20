import { NotificationConfig } from "~/store/NotificationsSlice";
import { ServerTypeName } from "../types";

export interface BossNotification {
  [bossName: string]: {
    servers: ServerTypeName[];
    timeBefore: number;
    timeAfter: number;
  };
}

//app\config\customConfig.ts
export interface CustomConfig {
  theme: 'dark' | 'light'
  debug: "none" | "normal" | "complete";
  selectionType: "listbox" | "checkbox";
  notifications: {
    global: NotificationConfig;
    bossNotifications: {
      respawn: BossNotification;
      die: BossNotification;
    };
  };
}

export const defaultConfig: CustomConfig = {
  theme: 'dark',
  debug: "none",
  selectionType: "listbox",

  notifications: {
    global: {
      enabled: true,
      channel: "both",
      duration: 5000,
      sound: false,
      grouping: true,
    },
    bossNotifications: {
      respawn: {},
      die: {},
    }, // Inicializado como un objeto vacío
  },
};
