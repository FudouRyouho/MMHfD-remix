export interface BossLogEntry {
  fecha: string;
  monstruo: string;
  jugador: string;
  servidor: string;
  mapa: string;
}

export interface TimeLeftResult {
  timeStr: string;
  isPast: boolean;
}

export type BossType = 'fixed' | 'relative';




// Función auxiliar para calcular la próxima aparición de un boss con horario fijo
