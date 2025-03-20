import React, { useEffect, useState } from "react";
//import Accordion from 'react-bootstrap/Accordion';
import Accordion from "~/components/Layout/UI/accordion/Accordion";
//import 'bootstrap/dist/css/bootstrap.min.css';

const AccordionPlayground: React.FC = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(typeof window !== "undefined"); // Verifica si window está definido
  }, []);

  return (
    <div>
      {isBrowser ? (
        <div>
          <h2>ChangeLogs</h2>
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                v0.03 <p className="text-accent">Dios quiera que pronto</p>
              </Accordion.Header>
              <Accordion.Body>
                <p className="">
                  <span className="text-red-500">* </span>Mejoras en la
                  implementacion de la Slidebar para movil, cambios en su
                  estructura visual y mejoras en la navegacion.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>Cambios en la interfaz
                  de tracking, el formato de horario se calculo segun la hora
                  local del dispositivo.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>Cambios y mejoras en
                  la interfaz del Boss Tracking.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>Se ha añadido 2
                  secciones nuevas 'Helpers' y 'Guides', para futuras
                  herramientas y guias, respectivamente.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>En esta version se
                  implementan las configuraciones de notificaciones, asi como la
                  estructura visual de las mismas, para la implementacion en la
                  siguiente version.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>Se han realizado
                  cambios en como BossTracking se actualiza de forma pasiva, en
                  futuras versiones se implementaran actualizaciones de forma
                  'global'.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>Se han añadido filtros
                  de 'servidores' para el Boss Traking si no hay filtros
                  seleccionados se mostraran todos los servidores de forma
                  predeterminada.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>Se ha añadido a la
                  configuracion del Boss Tracking una alternativa de filtros
                  multiples para bosses, como los filtros de servdiores, si no
                  hay un Boss seleccionado se mostraran todos de forma
                  predeterminada.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>Notas del desarrollo
                  de esta version, se conocen varios bugs en el tracking, se han
                  desahibilitado las 'funciones' que lo causan en busca de
                  soluciones para la futura version.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>Notas del desarrollo
                  de esta version 2, hay animaciones que no funcionan
                  correctamente, asi mismo, que funcionan dios vaya a saber
                  porque sinceramente, no pienso arreglarlo ahora.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>Bosstraking: Se ha implementado una 'espera' a la carga de datos para evitar bugs :)
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                v0.02 <p className="text-accent">31/01/2025</p>
              </Accordion.Header>
              <Accordion.Body>
                <p className="">
                  <span className="text-red-500">* </span>Primeras
                  implementaciones de la Slidebar.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>Cambios en la interfaz
                  visual.
                </p>
                <p className="">
                  <span className="text-red-500">* </span>Correccion de bugs en
                  el trackeo.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                v0.01 <p className="text-accent">21/01/2025</p>
              </Accordion.Header>
              <Accordion.Body>
                <p className="">
                  <span className="text-red-500">* </span>Creacion del Boss
                  Tracker y primeras pruebas.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ) : (
        <p>ssr died</p>
      )}
    </div>
  );
};
export default AccordionPlayground;
