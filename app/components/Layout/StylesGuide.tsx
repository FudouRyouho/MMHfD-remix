import React, { useState } from "react";
import {
  Bell,
  Info,
  ChevronRight,
  Settings,
  CircleCheck,
  CircleAlert,
  CircleX,
  X,
  View,
} from "lucide-react"; 
import { Button, Input } from "@headlessui/react";
import UIButtons from "./UI/UI-Button";
import useNotification from "./Notifications/Utils/useNotification";

export default function StyleGuide() {
  const [isLoading, setIsLoading] = useState(false);

  const handleNotification = useNotification();

  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Guía de Estilos</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Colores Base</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 p-4 rounded">
            Fondo principal (bg-zinc-900)
          </div>
          <div className="bg-zinc-800 p-4 rounded">Sidebar (bg-zinc-800)</div>
          <div className="p-4 rounded border border-white/5">
            Texto principal
          </div>
          <div className="p-4 rounded border border-white/5 text-zinc-400">
            Texto secundario
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Interacciones</h2>
        <div className="space-y-4">
          <button className="bg-zinc-800 hover:bg-white/10 focus:bg-white/5 active:bg-white/15 p-2 rounded transition-all duration-300 ease-in-out">
            Hover, Focus, y Active
          </button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Bordes y Separadores</h2>
        <div className="space-y-4">
          <div className="p-4 rounded border border-white/5">Borde sutil</div>
          <div className="p-4 rounded border-t border-zinc-700">Separador</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Acentos y Elementos Destacados
        </h2>
        <div className="space-y-4">
          <div className="bg-indigo-500 p-4 rounded">Acento principal</div>
          <div className="bg-emerald-500 p-4 rounded">Acento secundario</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Elementos de Formulario</h2>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Input"
            className="bg-zinc-800 data-[hover]:bg-white/15 border border-white/5 data-[hover]:border-indigo-500 data-[hover]:ring-indigo-500/20 data-[focus]:border-indigo-300 outline-none p-2 rounded w-full transition-all duration-300 ease-in-out"
          />
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Botones</h2>
        <div className="space-y-4">
          <div className="flex flex-row gap-4 border border-white/5 p-2 rounded-lg">
            <Button className="group bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white px-4 py-2 rounded transition-all duration-300 ease-in-out inline-flex items-center">
              <ChevronRight
                size={16}
                className="mr-2 transition-all duration-300 ease-in-out group-hover:translate-x-1"
              />
              <span>Continuar</span>
            </Button>
            <Button className="group bg-white/5 hover:bg-white/15 active:bg-white/10 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white hover:text-indigo-300 px-4 py-2 rounded transition-all duration-300 ease-in-out inline-flex items-center">
              <Bell
                size={16}
                className="mr-2 transition-all duration-300 group-hover:rotate-12"
              />
              <span className="group-active:text-indigo-500 transition-colors duration-300">
                Notificaciones
              </span>
            </Button>
            <Button className="relative overflow-hidden bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white px-4 py-2 rounded transition-all duration-300 ease-in-out group">
              <span className="relative z-10">Efecto Onda</span>
              <span className="absolute inset-0 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Button>
            <Button className="group bg-white/5 hover:bg-white/15 active:bg-white/10 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white hover:text-indigo-300 px-4 py-2 rounded transition-all duration-300 ease-in-out inline-flex items-center">
              <Settings
                size={16}
                className="mr-2 transition-all duration-300 group-hover:rotate-90"
              />
              <span className="group-active:text-indigo-500 transition-colors duration-300">
                Configuración
              </span>
            </Button>
          </div>
          <div className="grid grid-cols-2 place-items-center w-max gap-4 border border-white/5 p-8 rounded-lg">
            <UIButtons type="icon" icon={View} />
            <UIButtons type="icon" variant="secondary" icon={View} />

            <UIButtons
              type="icon"
              icon={View}
              switcher={isLoading}
              onClick={() => setIsLoading(!isLoading)}
            />
            <UIButtons
              type="icon"
              icon={View}
              variant="secondary"
              switcher={isLoading}
              onClick={() => setIsLoading(!isLoading)}
            />

            <UIButtons
              text="Boton primario"
              switcher={isLoading}
              onClick={() => setIsLoading(!isLoading)}
              switcherText="Cargando..."
            />
            <UIButtons variant="secondary" text="Boton secundario" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Notificaciones y Estados
        </h2>
        <div className="space-y-4">
            {/* Success */}
          <div className="flex flex-row gap-4">
            <div className="w-full bg-emerald-500/10 text-emerald-300 p-4 rounded flex justify-between">
              <div className="flex gap-1">
                <CircleCheck className="mr-2" />
                Success
              </div>
              <Button className="group transition-all duration-300 ease-in-out inline-flex items-center">
                <X className="group-hover:text-red-500 group-active:text-white group-hover:rotate-90 group-active:-rotate-90 transition-all duration-300" />
              </Button>
            </div>
            <UIButtons
              text="Testing"
              onClick={() =>
                handleNotification("success", "This is succes notification")
              }
            />
          </div>
          {/* Error */}
          <div className="flex flex-row gap-4">
          <div className="w-full bg-red-500/10 text-red-300 p-4 rounded flex justify-between">
            <div className="flex gap-1">
              <CircleX className="mr-2" />
              Error
            </div>
            <Button className="group transition-all duration-300 ease-in-out inline-flex items-center">
              <X className="group-hover:text-red-500 group-active:text-white group-hover:rotate-90 group-active:-rotate-90 transition-all duration-300" />
            </Button>
          </div>
          <UIButtons
              text="Testing"
              onClick={() =>
                handleNotification("error", "This is error notification")
              }
            />
          </div>
          {/* Warnning */}
          <div className="flex flex-row gap-4">
          <div className="w-full bg-yellow-500/10 text-yellow-300 p-4 rounded flex justify-between">
            <div className="flex gap-1">
              <CircleAlert className="mr-2" />
              Warnning
            </div>
            <Button className="group transition-all duration-300 ease-in-out inline-flex items-center">
              <X className="group-hover:text-red-500 group-active:text-white group-hover:rotate-90 group-active:-rotate-90 transition-all duration-300" />
            </Button>
          </div>
          <UIButtons
              text="Testing"
              onClick={() =>
                handleNotification("warning", "This is warning notification")
              }
            />
          </div>
          {/* Info */}
          <div className="flex flex-row gap-4">
          <div className="w-full bg-blue-500/10 text-blue-300 p-4 rounded flex justify-between">
            <div className="flex gap-1">
              <Info className="mr-2" />
              Información
            </div>
            <Button className="group transition-all duration-300 ease-in-out inline-flex items-center">
              <X className="group-hover:text-red-500 group-active:text-white group-hover:rotate-90 group-active:-rotate-90 transition-all duration-300" />
            </Button>
          </div>
          <UIButtons
              text="Testing"
              onClick={() =>
                handleNotification("info", "This is info notification")
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
