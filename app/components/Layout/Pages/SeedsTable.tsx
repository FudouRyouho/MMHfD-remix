import React, { useState } from "react";
import seeds from "../../../test/seeds.json";
import { SeedsData } from "~/test/seeds.type.";

const seedsData: SeedsData = seeds as SeedsData;

export const SeedsTable: React.FC = () => {
  Object.entries(seedsData.seeds.info).forEach(([type, elements]) => {
    console.log(`Tipo: ${type}`);
    Object.entries(elements).forEach(([element, bonuses]) => {
      console.log(`  Elemento: ${element}`);
      Object.entries(bonuses.beta).forEach(([bonusName, bonusValue]) => {
        console.log(`    Bonificación: ${bonusName}`);
        console.log(`      Valor: ${bonusValue}`);
      });
    });
  });
  return (
    <div className="text-secondary overflow-hidden w-max h-max text-xs rounded-lg border-full">
      {/* Header */}
      <div className=" sticky top-0 flex px-6 py-4 font-medium text-sm">
        <div className="w-[130px]">Elemento</div>
        <div className="flex-1">Bonificación</div>
        <div className="w-[90px] text-right">Nivel 1</div>
      </div>

      {/* Body */}
      <div className="border-[1px] border-white/10">
        {Object.entries(seedsData.seeds.info).map(([type, elements]) => (
          <React.Fragment key={elements}>
            {Object.entries(elements).map(([element, bonuses]) => (
              <div
                key={element}
                className="group flex flex-col table-bg"
              >
                {Object.entries(bonuses.beta).map(
                  ([bonusName, bonusValue], index) => (
                    <div
                      key={`${element}-${bonusName}`}
                      className="flex items-center py-3 transition-colors first:pt-4 last:pb-4 odd:bg-black/10 dark:odd:bg-white/5"
                    >
                      {index === 0 && (
                        <div className="w-[130px] font-medium">{element}</div>
                      )}
                      {index !== 0 && <div className="w-[130px]" />}
                      <div className="flex-1 text-secondary">{bonusName}</div>
                      <div className="w-[90px] text-right font-mono">
                        {bonusValue[0]} {/* Accedemos a bonusValue.beta[0] */}
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

interface CostoNivel {
  runasNecesarias: number;
  costoTotal: number;
}

function calcularCostos(nivelMaximo: number): Record<number, CostoNivel> {
  const costos: Record<number, number> = {
    2: 4,
    3: 5,
    4: 5,
    5: 6,
    6: 6,
    // Completa los costos para los niveles 7 al 10
    7: 7,
    8: 7,
    9: 8,
    10: 9,
  };

  const tabla: Record<number, CostoNivel> = {
    1: { runasNecesarias: 0, costoTotal: 0 },
  };

  for (let nivel = 2; nivel <= nivelMaximo; nivel++) {
    const runasNecesarias = costos[nivel] || 0;
    const costoNivelInferior = tabla[nivel - 1].costoTotal;
    const costoTotal = costoNivelInferior * 2 + runasNecesarias;

    tabla[nivel] = { runasNecesarias, costoTotal };
  }

  return tabla;
}

function TablaCostos() {
  const [tabla, setTabla] = useState<Record<number, CostoNivel>>({});
  const nivelMaximo = 10;

  React.useEffect(() => {
    const tablaCalculada = calcularCostos(nivelMaximo);
    setTabla(tablaCalculada);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Nivel</th>
          <th>Runas necesarias</th>
          <th>Costo total</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(tabla).map(([nivel, datos]) => (
          <tr key={nivel}>
            <td>{nivel}</td>
            <td>{datos.runasNecesarias}</td>
            <td>{datos.costoTotal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaCostos;
