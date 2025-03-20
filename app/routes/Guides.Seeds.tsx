import { Switch } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import TablaCostos, {SeedsTable} from "~/components/Layout/Pages/SeedsTable";
import Accordion from "~/components/Layout/UI/accordion/Accordion";

const SeedsGuide: React.FC = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(typeof window !== "undefined"); // Verifica si window está definido
  }, []);

  const [MUClient, setMUClient] = useState(false);

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
      {isBrowser ? (
        <>
          <p>In Progress...</p>
          <div className="flex flex-row gap-4">
            <Switch
              checked={MUClient}
              onChange={setMUClient}
              className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
              />
            </Switch>
            <p>Version del juego: {MUClient ? "Classic" : "Beta"}</p>
          </div>
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="1">
              <Accordion.Header>¿Como crear una Seed?</Accordion.Header>
              <Accordion.Body>
                <p>Para crear una Seed se requieren los siguientes items:</p>
                <p>Item excellent +4 x1</p>
                <p>Item Ancient +4 x1</p>
                <p>Jewel of Chaos x1</p>
                <p>Jewel of Creation x1</p>
                <p>Jewel of Harmony x1</p>
                <Accordion>
                  <Accordion.Item eventKey="011">
                    <Accordion.Header>Mas informacion</Accordion.Header>
                    <Accordion.Body>
                      <div className="flex flex-col gap-1">
                        <p>¿Donde se encuentra el npc?</p>
                        <p className="text-center mx-6">
                          <span className="text-red-500">* </span>La unicacion
                          del npc es: aca se supone que va una imagen, pero
                          paja.
                        </p>
                        <p>¿Cual es la opcion para crear la seed?</p>
                        <p className="text-center mx-6">
                          <span className="text-red-500">* </span>La segunda
                          opcion es para crear la seed
                        </p>
                        <p>
                          ¿Los items exe y acc deben de ser +4 siempre? ¿Que
                          items puedo usar?
                        </p>
                        <p className="text-center mx-6">
                          <span className="text-red-500">* </span>El objeto
                          Excellent o Acient puede ser de cualquier nivel, asi
                          mismo, puedes utilizar cualquier objeto exepto joyeria
                          (Ring, Pendant), esto solo esta diponible en la
                          version classic
                        </p>
                        <p>
                          ¿Puedo obtener la seed que quiero/necesito? ¿Los
                          objetos exe y acc deben de ser del mismo tipo?
                        </p>
                        <p className="text-center mx-6">
                          <span className="text-red-500">*</span>No y no, las
                          Seeds obtenidas son de un 'elemento' aleatorio, su
                          tipo es 'apartir' del acc quemado, el objeto exc no
                          tiene que ser del mismo tipo y no afecta en su
                          'creacion', esto se referencia en la lista de abajo.
                        </p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>¿Como crear una Seed Sphere?</Accordion.Header>
              <Accordion.Body>
                <p>
                  Para crear una Seed Sphere se requieren los siguientes items:
                </p>
                <p>Seed x1</p>
                <p>Sphere x1</p>
                <p>Jewel of Chaos x1</p>
                <p>Jewel of Creation x1</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <SeedsTable />
          <TablaCostos/>
        </>
      ) : (
        <p>ssr died</p>
      )}
    </div>
  );
};

export default SeedsGuide;
