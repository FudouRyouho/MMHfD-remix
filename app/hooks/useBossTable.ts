import { useMemo, useState } from "react";
import {
  createColumnHelper,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { bossConfigs, BossLogEntry } from "~/lib/types";
import { formatDate, getNextFixedSpawn, calculateTimeLeft } from "~/lib/date";
import { Temporal } from "@js-temporal/polyfill";

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
    cell: (info) => formatDate(info.getValue().toZonedDateTime(Intl.DateTimeFormat().resolvedOptions().timeZone)),
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

export const useBossTable = (
  data: BossLogEntry[],
  currentTime: Temporal.ZonedDateTime
) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(() => createColumns(), []);

  const tableData = useMemo(() => {
    return data.map((entry) => {
      const bossConfig = bossConfigs[entry.monstruo];
      let nextSpawnDate: Temporal.ZonedDateTime;
      let nextSpawnStr: string;

      if (bossConfig?.type === "fixed") {
        nextSpawnDate = getNextFixedSpawn(bossConfig.schedule!, currentTime);
        nextSpawnStr = nextSpawnDate ? formatDate(nextSpawnDate) : "No configurado";
      } else if (bossConfig?.type === "relative") {
        const deathDate = entry.fecha.toZonedDateTime(currentTime.timeZoneId);
        nextSpawnDate = deathDate.add({ hours: bossConfig.timer! });
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
        fecha: entry.fecha,
      };
    });
  }, [data, currentTime]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { table, sorting, setSorting };
};
