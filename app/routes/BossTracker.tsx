import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { bosses, BossLogEntry, bossConfigs } from "~/types/types";
import {
  parseDateString,
  formatDate,
  calculateTimeLeft,
  getNextFixedSpawn,
} from "~/utils/date";
import axios from "axios";
import * as cheerio from "cheerio";
import UIComboBox from "~/components/Layout/UI/UI-Combobox";
import UIButtons from "~/components/Layout/UI/UI-Button";

// Columnas y constantes
const columnHelper = createColumnHelper<
  BossLogEntry & { nextSpawn: string; timeLeft: string }
>();
const INTERVAL_DURATION = 1000; // 1 segundo

const createColumns = () => [
  columnHelper.accessor("monstruo", {
    cell: (info) => info.getValue(),
    header: "Boss",
  }),
  columnHelper.accessor("servidor", {
    cell: (info) => info.getValue(),
    header: "Servidor",
  }),
  columnHelper.accessor("fecha", {
    cell: (info) => info.getValue(),
    header: "Última muerte",
  }),

  columnHelper.accessor("nextSpawn", {
    cell: (info) => info.getValue(),
    header: "Próxima aparición",
  }),
  columnHelper.accessor("timeLeft", {
    cell: (info) => info.getValue(),
    header: "Tiempo restante",
  }),
  columnHelper.accessor("mapa", {
    cell: (info) => info.getValue(),
    header: "Mapa",
  }),
];

export const loader: LoaderFunction = async () => {
  try {
    const { data: html } = await axios.get("https://es.megamu.net/boss-log");
    const $ = cheerio.load(html);

    const rawData: BossLogEntry[] = $("#bossTable tbody tr")
      .map((_, row) => {
        const cells = $(row).find("td");
        return {
          fecha: $(cells[0]).text().trim(),
          monstruo: $(cells[1]).text().trim(),
          jugador: $(cells[2]).text().trim(),
          servidor: $(cells[3]).text().trim(),
          mapa: $(cells[4]).text().trim(),
        };
      })
      .get();

    // Filtrar y procesar datos una sola vez en el servidor
    const filteredData = rawData.filter((entry) => {
      const serverMatch = entry.servidor.match(/^Sv(\d{1,2})$/);
      return serverMatch && parseInt(serverMatch[1]) <= 19;
    });

    const groupedData = filteredData.reduce((acc, entry) => {
      const key = `${entry.servidor}-${entry.monstruo}`;
      if (
        !acc[key] ||
        parseDateString(entry.fecha) > parseDateString(acc[key].fecha)
      ) {
        acc[key] = entry;
      }
      return acc;
    }, {} as Record<string, BossLogEntry>);

    return json({ data: Object.values(groupedData) });
  } catch (error) {
    console.error("Error during scraping:", error);
    return json(
      { error: "Scraping failed", details: error.message },
      { status: 500 }
    );
  }
};

export default function BossTracker() {
  const { data } = useLoaderData<typeof loader>();
  const [selectedBoss, setSelectedBoss] = useState<string>("");
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(() => createColumns(), []);
  const filteredData = useMemo(() => {
    if (!selectedBoss) return data;
    return data.filter((entry) => entry.monstruo === selectedBoss);
  }, [data, selectedBoss]);

  const tableData = useMemo(() => {
    return filteredData.map((entry) => {
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
  }, [filteredData, currentTime]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateTime = () => setCurrentTime(new Date());
    const now = new Date();
    const delay = 1000 - now.getMilliseconds();
    const timeoutId = setTimeout(() => {
      updateTime();
      intervalId = setInterval(updateTime, INTERVAL_DURATION);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const filterByBoss = useCallback(
    (bossName: string) => setSelectedBoss(bossName),
    []
  );
  const showAllData = useCallback(() => setSelectedBoss(null), []);

  return (
    <div className="bg-zinc-900 text-zinc-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Boss Tracker</h1>

      <div className="flex flex-row gap-2 my-4">
        <UIButtons
          text="All"
          variant="primary"
          onClick={showAllData}
          disabled={selectedBoss === null}
        />
        <UIComboBox
          label={selectedBoss}
          options={bosses}
          value={selectedBoss}
          onChange={setSelectedBoss}
        />
      </div>

      <div className="m-2">
        <table className="border-white/5 border-2 w-full h-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b-white/5">
                {headerGroup.headers.map((header) => (
                <>
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="text-left text-sm font-medium uppercase tracking-wider cursor-pointer select-none border-l-[1px] border-l-white/5"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    
                    <span className="ml-2">
                      {{
                        asc: "↑",
                        desc: "↓",
                      }[header.column.getIsSorted() as string] ?? null}
                    </span>
                    

                    
                  </th>
                  </>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-zinc-400">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`text-left text-sm border-l-[1px] border-l-white/5 ${
                      cell.column.id === "timeLeft"
                        ? cell.getValue().toString().startsWith("+")
                          ? "text-red-600"
                          : "text-green-600"
                        : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
