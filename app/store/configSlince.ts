//app\store\configSlince.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customConfig, defaultConfig } from "~/config/customConfig";
import { RootState } from "./store";

type ConfigState = customConfig;

const loadConfigFromLocalStorage = (): ConfigState => {
  if (typeof localStorage === "undefined") return defaultConfig;
  const saved = localStorage.getItem("appConfig");
  return saved ? JSON.parse(saved) : defaultConfig;
};

const saveConfigToLocalStorage = (config: ConfigState) => {
  localStorage.setItem("appConfig", JSON.stringify(config));
};

const saveConfig = (state: ConfigState) => {
  saveConfigToLocalStorage(state);
};

const configSlice = createSlice({
  name: "config",
  initialState: loadConfigFromLocalStorage(),
  reducers: {
    updateConfig: (state, action: PayloadAction<Partial<ConfigState>>) => {
      const newState = { ...state, ...action.payload };
      saveConfig(newState);
    },
    resetConfig: (state) => {
      Object.assign(state, defaultConfig);
      saveConfig(state);
    },
    updateDebug: (state, action: PayloadAction<customConfig["debug"]>) => {
      state.debug = action.payload;
      saveConfig(state);
    },
  },
});

export const {
  updateConfig,
  resetConfig,
  updateDebug,
} = configSlice.actions;

export const selectConfig = (state: RootState): ConfigState => state.config;
export const selectDebug = (state: RootState) => state.config.debug;

export default configSlice.reducer;