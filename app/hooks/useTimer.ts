import { useState, useEffect, useMemo } from "react";
import { Temporal } from '@js-temporal/polyfill';

/**
 * Hook de temporizador que actualiza el tiempo cada segundo.
 * @param {number} interval - Intervalo en milisegundos (por defecto 1000ms / 1s).
 * @param {string} timeZone - Zona horaria (por defecto 'America/Argentina/Buenos_Aires').
 * @returns {Temporal.ZonedDateTime} - Hora actualizada en tiempo real con la zona horaria especificada.
 */
export function useTimer(interval = 1000, timeZone = 'America/Argentina/Buenos_Aires') {

  const getTimeZonedDateTime = () => {
    return Temporal.Now.zonedDateTimeISO(timeZone);
  };

  const [currentTime, setCurrentTime] = useState(getTimeZonedDateTime());

  useEffect(() => {
    const updateTime = () => setCurrentTime(getTimeZonedDateTime());

    const now = new Date();
    const delay = interval - (now.getTime() % interval);

    const timeoutId = setTimeout(() => {
      updateTime();
      const intervalId = setInterval(updateTime, interval);
      return () => clearInterval(intervalId);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [interval, timeZone]); // timeZone agregado a las dependencias

  return currentTime;
}