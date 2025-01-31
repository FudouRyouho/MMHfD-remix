import { useMemo, useState } from "react";
import {
  createColumnHelper,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { BossLogEntry } from "~/types/types";
import {
  formatDate,
  getNextFixedSpawn,
  calculateTimeLeft,
  parseDateString,
} from "~/utils/date";
import { useSelector } from "react-redux";
import { selectConfig } from "~/store/configSlince";

const columnHelper = createColumnHelper<
  BossLogEntry & { nextSpawn: string; timeLeft: string }
>();
const createColumns = () => [
  columnHelper.accessor("monstruo", {
    cell: (info) => info.getValue(),
    header: "Boss",
  }),
  columnHelper.accessor("servidor", {
    cell: (info) => info.getValue(),
    header: "Servidor",
  }),
  columnHelper.accessor("timeLeft", {
    cell: (info) => info.getValue(),
    header: "Tiempo restante",
  }),
  columnHelper.accessor("fecha", {
    cell: (info) => info.getValue(),
    header: "Última muerte",
  }),
  columnHelper.accessor("nextSpawn", {
    cell: (info) => info.getValue(),
    header: "Próxima aparición",
  }),

  columnHelper.accessor("mapa", {
    cell: (info) => info.getValue(),
    header: "Mapa",
  }),
];

export const useBossTable = (data: BossLogEntry[], currentTime: Date) => {
  const config = useSelector(selectConfig);
  const bossConfigs = config.bossConfigs;
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(() => createColumns(), []);

  const tableData = useMemo(() => {
    return data.map((entry) => {
      const bossConfig = bossConfigs[entry.monstruo];
      let nextSpawnDate: Date;
      let nextSpawnStr: string;

      if (bossConfig?.type === "fixed") {
        nextSpawnDate = getNextFixedSpawn(bossConfig.schedule!, currentTime);
        nextSpawnStr = formatDate(nextSpawnDate);
      } else if (bossConfig?.type === "relative") {
        const deathDate = parseDateString(entry.fecha);
        nextSpawnDate = new Date(
          deathDate.getTime() + bossConfig.timer! * 60 * 60 * 1000
        );
        nextSpawnStr = formatDate(nextSpawnDate);
      } else {
        nextSpawnStr = "No configurado";
      }

      const { timeStr, isPast } = calculateTimeLeft(
        entry.fecha,
        entry.monstruo,
        currentTime,
        bossConfigs
      );

      return {
        ...entry,
        nextSpawn: nextSpawnStr,
        timeLeft: `${isPast ? "+" : "-"}${timeStr}`,
      };
    });
  }, [data, currentTime]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(), // Cambiado para usar la función proporcionada
    getSortedRowModel: getSortedRowModel(),
  });

  return { table, sorting, setSorting };
};
