import { Temporal } from "@js-temporal/polyfill";
import { useSelector } from "react-redux";
import { formatDate, parseDateString } from "~/lib/date";
import { bossConfigs, BossLogEntry, BossName, RawBossLogEntry } from "~/lib/types";
import { selectConfig } from "~/store/configSlince";

export const RawBossDataTrasform = (rawData: RawBossLogEntry[]): BossLogEntry[] => {
    return rawData.map((rawEntry) => {
        const fecha = parseDateString(rawEntry.fecha);
        if (!fecha) {
            console.warn(`Fecha inválida: ${rawEntry.fecha}`);
            return null;
        }

        return {
            fecha,
            monstruo: rawEntry.monstruo,
            jugador: rawEntry.jugador,
            servidor: parseInt(rawEntry.servidor.replace("Sv", ""), 10),
            mapa: rawEntry.mapa,
        };
    }).filter(entry => entry !== null) as BossLogEntry[];
};

export function groupAndFilterBossData(data: RawBossLogEntry[]): RawBossLogEntry[] {
    const groupedData = data.reduce((acc, entry) => {
        const key = `${entry.servidor}-${entry.monstruo}`;
        const bossConfig = bossConfigs[entry.monstruo as BossName];

        if (!bossConfig) {
            //console.warn(`Configuración no encontrada para el jefe: ${entry.monstruo}`);
            return acc;
        }

        const regularMap = bossConfig.mapa;

        if (regularMap && regularMap === entry.mapa) {
            const entryFecha = parseDateString(entry.fecha);
            const accFecha = acc[key] ? parseDateString(acc[key].fecha) : null;

            if (!entryFecha) {
                console.warn(`Fecha inválida: ${entry.fecha}`);
                return acc;
            }

            if (!acc[key] || (accFecha && Temporal.PlainDateTime.compare(entryFecha, accFecha) > 0)) {
                acc[key] = entry;
            }
        }
        return acc;
    }, {} as Record<string, RawBossLogEntry>);

    return Object.values(groupedData);
}