// app\store\configSlince.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomConfig, defaultConfig } from "~/lib/config/customConfig";
import { RootState } from "./store";

type ConfigState = CustomConfig;

const loadConfigFromLocalStorage = (): ConfigState => {
  if (typeof localStorage === "undefined") return defaultConfig;
  const saved = localStorage.getItem("appConfig");
  let loadedConfig = saved ? JSON.parse(saved) : {};

  const mergeConfigs = (loaded: any, defaultConf: any): ConfigState => {
    const merged = { ...defaultConf };

    for (const key in loaded) {
      if (loaded.hasOwnProperty(key)) {
        if (typeof loaded[key] === 'object' && typeof defaultConf[key] === 'object') {
          merged[key] = mergeConfigs(loaded[key], defaultConf[key]);
        } else {
          merged[key] = loaded[key];
        }
      }
    }

    return merged as ConfigState;
  };

  const mergedConfig = mergeConfigs(loadedConfig, defaultConfig);
  return mergedConfig;
};

const saveConfigToLocalStorage = (config: ConfigState) => {
  localStorage.setItem("appConfig", JSON.stringify(config));
};

const configSlice = createSlice({
  name: "config",
  initialState: loadConfigFromLocalStorage(),
  reducers: {
    updateConfig: (state, action: PayloadAction<Partial<ConfigState>>) => { // actualizado
      const newState = { ...state, ...action.payload };
      saveConfigToLocalStorage(newState);
      return newState;
    },
    resetConfig: (state) => {
      Object.assign(state, defaultConfig);
      saveConfigToLocalStorage(state);
      return state;
    },
    updateDebug: (state, action: PayloadAction<CustomConfig["debug"]>) => {
      state.debug = action.payload;
      saveConfigToLocalStorage(state);
      return state;
    },
  },
});

export const { updateConfig, resetConfig, updateDebug } = configSlice.actions;

export const selectConfig = (state: RootState): ConfigState => state.config;
export const selectDebug = (state: RootState) => state.config.debug;

export default configSlice.reducer;