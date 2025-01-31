import { useState, useEffect } from "react";

/**
 * Hook de temporizador que actualiza el tiempo cada segundo en horario UTC-3 (Argentina/Brasil).
 * @param {number} interval - Intervalo en milisegundos (por defecto 1000ms / 1s).
 * @returns {Date} - Hora actualizada en tiempo real con zona horaria fija.
 */
export function useTimer(interval = 1000) {
  const getTimeUTC3 = () => {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000 - 3 * 3600000);
  };

  const [currentTime, setCurrentTime] = useState(getTimeUTC3());

  useEffect(() => {
    const updateTime = () => setCurrentTime(getTimeUTC3());
    
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
  }, [interval]);

  return currentTime;
}