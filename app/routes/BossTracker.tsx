import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useMemo, useCallback } from "react";
import { BossLogEntry } from "~/types/types";
import { parseDateString } from "~/utils/date";
import axios from "axios";
import * as cheerio from "cheerio";
import UIButtons from "~/components/Layout/UI/UI-Button";
import UITable from "~/components/Layout/UI/UI-Table";
import { useBossTable } from "~/components/utils/useBossTable";
import { useTimer } from "~/components/utils/useTimer";
import { useSelector } from "react-redux";
import { selectConfig } from "~/store/configSlince";
import UICheckboxList from "~/components/Layout/UI/UI-CheckBox";
import UIListBox from "~/components/Layout/UI/UI-SelectList";

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
  const config = useSelector(selectConfig);
  const bosses = config.bosses;
  const { selectionType } = config;
  const { data } = useLoaderData<typeof loader>();
  const currentTime = useTimer(1000); // Usamos el hook para manejar la hora UTC-3

  // Estado para las selecciones en CheckboxList y Listbox
  const [selectedBosses, setSelectedBosses] = useState<string[]>([]); // Para los checkbox
  const [selectedBossesList, setSelectedBossesList] = useState<string>('');

  // Filtrar los datos basados en los dos filtros
  const filteredData = useMemo(() => {
    if (selectedBosses.length === 0 && !selectedBossesList) return data; // Si no se seleccionan jefes, muestra todos
    return data.filter((entry) => selectedBosses.includes(entry.monstruo) || entry.monstruo === selectedBossesList); // Filtra si el monstruo está en selectedBosses o en selectedBossesList
  }, [data, selectedBosses, selectedBossesList]);

  const { table } = useBossTable(filteredData, currentTime);
  const showAllData = useCallback(() => {
    setSelectedBosses([]);
    setSelectedBossesList('');
  }, []);
  return (
    <div className="w-full bg-zinc-900 text-zinc-100 p-4 sm:p-8">
      <h1 className="text-4xl font-bold mb-8 sm:text-3xl">Boss Tracker</h1>

      <div className="flex flex-row gap-2 my-4">
        <UIButtons
          text="All"
          variant="primary"
          onClick={showAllData}
          disabled={selectedBosses.length === 0 && !selectedBossesList}
        />
        
        {selectionType === "checkbox" ? (
          <UICheckboxList
            options={bosses}
            value={selectedBosses}
            onChange={setSelectedBosses}
          />
        ) : (
          <UIListBox
            label={selectedBossesList ? selectedBossesList : 'Select Boss'}
            options={bosses}
            value={selectedBossesList}
            onChange={setSelectedBossesList}
          />
        )}
      </div>

      <div className="m-2">
        <UITable table={table} />
      </div>
    </div>
  );
}
