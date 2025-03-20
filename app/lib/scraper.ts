import axios from "axios";
import * as cheerio from "cheerio";
import { RawBossLogEntry } from "~/lib/types";
import { groupAndFilterBossData } from "./RawBossDataTrasform";

export async function scrapeBossData(): Promise<RawBossLogEntry[]> {
  try {
    const { data: html } = await axios.get("https://es.megamu.net/boss-log");
    const $ = cheerio.load(html);

    const rawData: RawBossLogEntry[] = $("#bossTable tbody tr")
      .map((_, row) => {
        const cells = $(row).find("td");
        if (cells.length !== 5) {
          console.warn("Fila con número incorrecto de celdas.");
          return null; // O manejar el error de otra manera
        }
        return {
          fecha: $(cells[0]).text().trim(),
          monstruo: $(cells[1]).text().trim(),
          jugador: $(cells[2]).text().trim(),
          servidor: $(cells[3]).text().trim(),
          mapa: $(cells[4]).text().trim(),
        };
      })
      .get()
      .filter((entry) => entry !== null) as RawBossLogEntry[];

    const filteredData = rawData.filter((entry) => {
      const serverMatch = entry.servidor.match(/^Sv(\d{1,2})$/);
      return serverMatch && parseInt(serverMatch[1]) <= 19;
    });

    const processedData = groupAndFilterBossData(filteredData);
    return Object.values(processedData);

  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error("Error de Axios durante scraping:", error.message);
      } else if (error instanceof Error) {
          console.error("Error durante scraping:", error.message);
      } else {
          console.error("Error desconocido durante scraping:", error);
      }
      throw error;
  }
}