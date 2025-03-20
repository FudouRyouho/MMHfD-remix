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
  Plus,
} from "../icons/IconBase";
import { Button, Input } from "@headlessui/react";
import UIButtons from "./UI/UI-Button";
import { useNotifications } from "../../hooks/useNotification";

export default function StyleGuide() {
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useNotifications();

  return (<>
        <div className="bg-gray-100 text-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Guía de Estilos (Tema Claro)</h1>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Colores Base</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded border border-gray-200">Fondo principal (bg-gray-100)</div>
            <div className="bg-white p-4 rounded border border-gray-200">Sidebar (bg-white)</div>
            <div className="p-4 rounded border border-gray-200">Texto principal</div>
            <div className="p-4 rounded border border-gray-200 text-gray-600">Texto secundario</div>
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Interacciones</h2>
          <div className="space-y-4">
            <button className="bg-white hover:bg-gray-200 focus:bg-gray-100 active:bg-gray-300 p-2 rounded transition-all duration-300 ease-in-out border border-gray-300">
              Hover, Focus, y Active
            </button>
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Bordes y Separadores</h2>
          <div className="space-y-4">
            <div className="p-4 rounded border border-gray-200">Borde sutil</div>
            <div className="p-4 rounded border-t border-gray-300">Separador</div>
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Acentos y Elementos Destacados</h2>
          <div className="space-y-4">
            <div className="bg-indigo-500 text-white p-4 rounded">Acento principal</div>
            <div className="bg-emerald-500 text-white p-4 rounded">Acento secundario</div>
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Elementos de Formulario</h2>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Input"
              className="bg-white data-[hover]:bg-gray-100 border border-gray-300 data-[hover]:border-indigo-500 data-[hover]:ring-indigo-500/20 data-[focus]:border-indigo-500 outline-none p-2 rounded w-full transition-all duration-300 ease-in-out"
            />
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Botones</h2>
          <div className="space-y-4">
            <div className="flex flex-row gap-4 border border-gray-200 p-2 rounded-lg">
              <Button className="group bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white px-4 py-2 rounded transition-all duration-300 ease-in-out inline-flex items-center">
                <ChevronRight className="mr-2 transition-all duration-300 ease-in-out group-hover:translate-x-1" />
                <span>Continuar</span>
              </Button>
              <Button className="group bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-gray-800 hover:text-indigo-700 px-4 py-2 rounded transition-all duration-300 ease-in-out inline-flex items-center">
                <Bell className="mr-2 transition-all duration-300 group-hover:rotate-12" />
                <span className="group-active:text-indigo-700 transition-colors duration-300">Notificaciones</span>
              </Button>
              <Button className="relative overflow-hidden bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white px-4 py-2 rounded transition-all duration-300 ease-in-out group">
                <span className="relative z-10">Efecto Onda</span>
                <span className="absolute inset-0 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Button>
              <Button className="group bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-gray-800 hover:text-indigo-700 px-4 py-2 rounded transition-all duration-300 ease-in-out inline-flex items-center">
                <Settings className="mr-2 transition-all duration-300 group-hover:rotate-90" />
                <span className="group-active:text-indigo-700 transition-colors duration-300">Configuración</span>
              </Button>
            </div>
            {/* The rest of the button examples remain the same, just ensure they use the light theme colors */}
          </div>
        </section>
  
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Notificaciones y Estados</h2>
          <div className="space-y-4">
            {/* Success */}
            <div className="flex flex-row gap-4">
              <div className="w-full bg-emerald-100 text-emerald-700 p-4 rounded flex justify-between">
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
                  notify("This is success notification", "success", {
                    channel: "web",
                    duration: 1000,
                  })
                }
              />
            </div>
            {/* Error */}
            <div className="flex flex-row gap-4">
              <div className="w-full bg-red-100 text-red-700 p-4 rounded flex justify-between">
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
                  notify("This is error notification", "error", {
                    channel: "web",
                    duration: 1000,
                  })
                }
              />
            </div>
            {/* Warning */}
            <div className="flex flex-row gap-4">
              <div className="w-full bg-yellow-100 text-yellow-700 p-4 rounded flex justify-between">
                <div className="flex gap-1">
                  <CircleAlert className="mr-2" />
                  Warning
                </div>
                <Button className="group transition-all duration-300 ease-in-out inline-flex items-center">
                  <X className="group-hover:text-red-500 group-active:text-white group-hover:rotate-90 group-active:-rotate-90 transition-all duration-300" />
                </Button>
              </div>
              <UIButtons
                text="Testing"
                onClick={() =>
                  notify("This is warning notification", "warning", {
                    channel: "web",
                    duration: 1000,
                  })
                }
              />
            </div>
            {/* Info */}
            <div className="flex flex-row gap-4">
              <div className="w-full bg-blue-100 text-blue-700 p-4 rounded flex justify-between">
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
                  notify("This is info notification", "info", {
                    channel: "web",
                    duration: 1000,
                  })
                }
              />
            </div>
          </div>
        </section>
      </div></>
  );
}
