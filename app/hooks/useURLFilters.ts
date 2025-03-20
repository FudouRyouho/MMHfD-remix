import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { FiltersState, updateFilter } from "~/store/FiltersSlince";

interface URLFilters {
  selectedBosses: string[];
  selectedBossesList: string;
  selectedServer: string[];
}

function updateURL(filters: FiltersState["filters"]) {
  const params = new URLSearchParams();
  const bossTracker = filters.bossTracker;

  if (bossTracker.selectedBosses.length > 0) {
    params.set("bosses", bossTracker.selectedBosses.join(","));
  }
  if (bossTracker.selectedBossesList) {
    params.set("bosses", bossTracker.selectedBossesList);
  }
  if (bossTracker.selectedServer.length > 0) {
    params.set("server", bossTracker.selectedServer.join(","));
  }

  window.history.replaceState(null, "", `?${params.toString()}`);
}

export function readURLFilters(): URLFilters {
  const params = new URLSearchParams(window.location.search);

  return {
    selectedBosses: params.get("bosses")?.split(",") || [],
    selectedBossesList: params.get("bosses") || "",
    selectedServer: params.get("serverTypes")?.split(",") || [],
  };
}

export function useURLFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters.filters);

  const setSelectedBosses = useCallback(
    (value: string[]) => {
      dispatch(
        updateFilter({ category: "bossTracker", key: "selectedBosses", value })
      );
    },
    [dispatch]
  );

  const setSelectedBossesList = useCallback(
    (value: string) => {
      dispatch(
        updateFilter({
          category: "bossTracker",
          key: "selectedBossesList",
          value,
        })
      );
    },
    [dispatch]
  );

  const setselectedServer = useCallback(
    (value: string[]) => {
      dispatch(
        updateFilter({ category: "bossTracker", key: "selectedServer", value })
      );
    },

    [dispatch]
  );

  useEffect(() => {
    const filtersFromURL = readURLFilters();
    const hasURLFilters = Object.values(filtersFromURL).some((value) =>
      Array.isArray(value) ? value.length > 0 : value
    );
    if (hasURLFilters) {
      setSelectedBosses(filtersFromURL.selectedBosses);
      setSelectedBossesList(filtersFromURL.selectedBossesList);
      setselectedServer(filtersFromURL.selectedServer);
    }
  }, [setSelectedBosses, setSelectedBossesList, setselectedServer]);

  useEffect(() => {
    updateURL(filters);
  }, [filters]);

  return {
    ...filters,
    bossTracker: {
      ...filters.bossTracker,
      setSelectedBosses,
      setSelectedBossesList,
      setselectedServer,
    },
  };
}
