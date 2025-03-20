//app\routes\Helpers.BossTracker.tsx
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import UIButtons from "~/components/Layout/UI/UI-Button";
import UICheckboxList from "~/components/Layout/UI/UI-CheckBox";
import UIListBox from "~/components/Layout/UI/UI-SelectList";
import UITable from "~/components/Layout/UI/UI-Table";
import { useBossTable } from "~/hooks/useBossTable";
import { useTimer } from "~/hooks/useTimer";
import { useBossTracker } from "~/hooks/useBossTracker";
import { selectConfig } from "~/store/configSlince";
import {
  bosses,
  BossLogEntry,
  SERVER_GROUPS,
  ServerTypeName,
} from "~/lib/types";
import { useURLFilters } from "~/hooks/useURLFilters";

export default function BossTracker() {
  const config = useSelector(selectConfig);
  const { selectionType, notifications } = config;
  const { data, isLoading: bossDataLoading } = useBossTracker();
  const currentTime = useTimer(
    1000,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const filters = useURLFilters();
  const dispatch = useDispatch();
  const {
    selectedBosses,
    setSelectedBosses,
    selectedBossesList,
    setSelectedBossesList,
    selectedServer,
    setselectedServer,
  } = filters.bossTracker;


  const filteredData = useMemo(() => {
    if (!data?.current) return [];

    return (
      data.current.filter((entry: BossLogEntry) => {
        const bossMatches =
          selectedBosses.length === 0 && !selectedBossesList
            ? true
            : selectedBosses.includes(entry.monstruo) ||
              entry.monstruo === selectedBossesList;

        const serverMatches =
          selectedServer.length === 0
            ? true
            : selectedServer.some((type) =>
                SERVER_GROUPS[type]?.includes(entry.servidor)
              );

        return bossMatches && serverMatches;
      }) ?? []
    );
  }, [bossDataLoading, selectedBosses, selectedBossesList, selectedServer]);

  const { table } = useBossTable(filteredData, currentTime);

  const showAllData = useCallback(() => {
    setSelectedBosses([]);
    setSelectedBossesList("");
    setselectedServer([]);
  }, [setSelectedBosses, setSelectedBossesList, setselectedServer]);

  return (
    <div className="w-full">
      {bossDataLoading || !data ? (
        <div>Cargando datos...</div>
      ) :(
        <>
          <div className="flex justify-between mb-4">
            <h1>Boss Tracker</h1>
          </div>
          <div className="w-full h-full flex flex-col gap-2 my-4">
            <div className="flex flex-row gap-2 h-full w-full">
              <UIButtons
                text="All"
                variant="primary"
                onClick={showAllData}
                switcher={
                  selectedBosses.length === 0 &&
                  !selectedBossesList &&
                  selectedServer.length === 0
                }
              />
              {selectionType === "listbox" ? (
                <UIListBox
                  label={
                    selectedBossesList ? selectedBossesList : "Selecionar Boss"
                  }
                  options={bosses}
                  value={selectedBossesList}
                  onChange={setSelectedBossesList}
                />
              ) : (
                <UICheckboxList
                  options={bosses}
                  value={selectedBosses ? selectedBosses : []}
                  onChange={(val) => setSelectedBosses(val)}
                />
              )}
            </div>
            <UICheckboxList
              options={Object.keys(SERVER_GROUPS) as ServerTypeName[]}
              value={selectedServer}
              onChange={setselectedServer}
              position="flex-row"
            />
          </div>
          <UITable table={table} />
        </>
      )}
    </div>
  );
}
