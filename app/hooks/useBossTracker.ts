// app/hooks/useBossTracker.ts
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectConfig } from "~/store/configSlince";
import { BossData } from "~/lib/types";
import { useNotifications } from "./useNotification";
import { RawBossDataTrasform } from "~/lib/RawBossDataTrasform";

export function useBossTracker() {
  const config = useSelector(selectConfig);
  const { notify } = useNotifications();
  const [data, setData] = useState<BossData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const instanceId = useRef(Math.random());

  useEffect(() => {
    const eventSource = new EventSource('/SSE-service'); // Corrección: ruta correcta

    eventSource.onopen = () => console.log(`✅ Conectado a SSE (ID: ${instanceId.current})`);
    eventSource.onerror = (error) => console.error(`❌ Error en SSE (ID: ${instanceId.current}):`, error);

    eventSource.onmessage = (event) => {
      try {
        const rawData = JSON.parse(event.data) as BossData;
        const transformedData = {
          current: RawBossDataTrasform(rawData.current),
          historical: rawData.historical,
          lastUpdate: rawData.lastUpdate,
        };
        setData(transformedData);
        setIsLoading(false);
        console.log(`📡 Datos recibidos (ID: ${instanceId.current}):`, event.data);
      } catch (error) {
        console.error(`⚠️ Error al parsear JSON o transformar datos (ID: ${instanceId.current}):`, error);
      }
    };

    return () => {
      console.log(` Cerrando conexión SSE (ID: ${instanceId.current})`);
      eventSource.close();
    };
  }, [config]);

  return { data, isLoading };
}