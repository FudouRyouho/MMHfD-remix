import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface BossTrackerFilters {
  selectedBosses: string[];
  selectedBossesList: string;
  selectedServer: string[];
}

export interface FiltersState {
  filters: {
    bossTracker: BossTrackerFilters;
    [key: string]: any;
  };
}


const initialState: FiltersState = {
  filters: {
    bossTracker: {
      selectedBosses: [],
      selectedBossesList: "",
      selectedServer: ['normal'],
    },
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter: (
      state,
      action: PayloadAction<{ category: string; key: string; value: any }>
    ) => {
      const { category, key, value } = action.payload;
      if (state.filters[category]) {
        state.filters[category][key] = value;
      }
    },
    resetFilterCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.filters[category]) {
        state.filters[category] = initialState.filters[category];
      }
    },
    resetAllFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { updateFilter, resetFilterCategory, resetAllFilters } =
  filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters.filters;

export default filtersSlice.reducer;
