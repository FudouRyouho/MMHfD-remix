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
  Loader,
} from "../icons/IconBase";
import { Button, Input } from "@headlessui/react";
import UIButtons from "./UI/UI-Button";
import { useNotifications } from "../../hooks/useNotification";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { selectConfig } from "~/store/configSlince";

export default function StyleGuide() {
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useNotifications();

  const config = useSelector((state: RootState) => selectConfig(state));

  const getColor = (key: string) => {
    const colors = {
      light: {
        textSecondary: "text-gray-500",
        border: "border-gray-200",
        accentPrimary: "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700",
        accentSecondary:
          "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700",
        notificationSuccess: "bg-emerald-100 text-emerald-700",
        notificationError: "bg-red-100 text-red-700",
        notificationWarning: "bg-yellow-100 text-yellow-700",
        notificationInfo: "bg-blue-100 text-blue-700",
      },
      dark: {
        textSecondary: "text-zinc-400",
        border: "border-white/5",
        accentPrimary: "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700",
        accentSecondary:
          "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700",
        notificationSuccess: "bg-emerald-500/10 text-emerald-300",
        notificationError: "bg-red-500/10 text-red-300",
        notificationWarning: "bg-yellow-500/10 text-yellow-300",
        notificationInfo: "bg-blue-500/10 text-blue-300",
      },
    };
    return colors[config.theme][key];
  };

  return (
    <div className={`background text-primary h-full`}>
      <h1 className="text-3xl font-bold mb-8">Guía de Estilos</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Colores Base</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className={`background p-4 rounded border-full`}>
            Fondo principal
          </div>
          <div className={`p-4 rounded border-full onBackground`}>Sidebar</div>
          <div className={`p-4 rounded border-full text-primary`}>
            Texto principal
          </div>
          <div className={`p-4 rounded border-full text-secondary`}>
            Texto secundario
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Bordes y Separadores</h2>
        <div className="space-y-4">
          <div className={`p-4 border-full rounded-lg`}>Borde sutil</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Acentos y Elementos Destacados
        </h2>
        <div className="space-y-4">
          <div className="accentPrimary p-4 rounded">Acento principal</div>
          <div className="accentSecondary p-4 rounded">Acento secundario</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Elementos de Formulario</h2>
        <div className="space-y-4">
          <Input type="text" placeholder="Input" className={`form-input`} />
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Botones</h2>
        <div className="space-y-4">
          <div
            className={`flex flex-row gap-4 border border-full p-2 rounded-lg`}
          >
            <Button
              className={`group accentPrimary focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white px-4 py-2 rounded transition-all duration-300 ease-in-out inline-flex items-center`}
            >
              <ChevronRight className="mr-2 transition-all duration-300 ease-in-out group-hover:translate-x-1" />
              <span>Continuar</span>
            </Button>
            <Button
              className={`group bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-primary hover:text-indigo-700 px-4 py-2 rounded transition-all duration-300 ease-in-out inline-flex items-center`}
            >
              <Bell className="mr-2 transition-all duration-300 group-hover:rotate-12" />
              <span className="group-active:text-indigo-500 transition-colors duration-300">
                Notificaciones
              </span>
            </Button>
            <Button className="relative overflow-hidden bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white px-4 py-2 rounded transition-all duration-300 ease-in-out group">
              <span className="relative z-10">Efecto Onda</span>
              <span className="absolute inset-0 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Button>
            <Button className="group bg-white/5 hover:bg-white/15 active:bg-white/10 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white hover:text-indigo-300 px-4 py-2 rounded transition-all duration-300 ease-in-out inline-flex items-center">
              <Settings className="mr-2 transition-all duration-300 group-hover:rotate-90" />
              <span className="group-active:text-indigo-500 transition-colors duration-300">
                Configuración
              </span>
            </Button>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-4 border border-white/5 p-8 rounded-lg">
            <p>Primary with icon</p>

            <Button className="group btn-primary">
              <View className="btn-icon" />
            </Button>
            <p>Secondary with icon</p>
            <Button className="group btn-secondary">
              <View className="btn-icon" />
            </Button>
            <p>Primary switcher with icon</p>
            <Button
              className="group btn-primary"
              disabled={isLoading}
              onClick={() => setIsLoading(!isLoading)}
            >
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <Info className="btn-icon" />
              )}
            </Button>
            <p>Secondary switcher with icon</p>
            <Button
              className="group btn-secondary"
              disabled={isLoading}
              onClick={() => setIsLoading(!isLoading)}
            >
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <Info className="btn-icon" />
              )}
            </Button>

            {/* Text Buttons */}
            <p>Primary with text</p>
            <Button className="group btn-primary">
              <span>Boton primario</span>
            </Button>
            <p>Secondary with text</p>
            <Button className="group btn-secondary">
              <span className="transition-all duration-300">
                Boton secundario
              </span>
            </Button>
            <p>Primary switcher with text</p>
            <Button
              className="group btn-primary"
              disabled={isLoading}
              onClick={() => setIsLoading(!isLoading)}
            >
              {isLoading ? (
                <div className="flex flex-row justify-center gap-2">
                  <Loader className="animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <span>Boton primario</span>
              )}
            </Button>
            <p>Secondary switcher with text</p>
            <Button
              className="group btn-secondary"
              disabled={isLoading}
              onClick={() => setIsLoading(!isLoading)}
            >
              {isLoading ? (
                <div className="flex flex-row justify-center gap-2">
                  <Loader className="animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <span>Boton secundario</span>
              )}
            </Button>
            <p>Primary with text and hover text</p>
            <UIButtons variant="primary" text="Botón" hoverText="Texto Hover" />
            <Button className="group btn-primary">
              <span className="invisible group-hover:visible">
                ola
              </span>
              <span className="visible group-hover:invisible">
                text
              </span>
            </Button>
            <p>Secondary with text and hover text</p>
            <UIButtons
              variant="secondary"
              text="Botón"
              hoverText="Texto Hover"
            />

            {/* Combined Buttons (Icon + Text) */}
            <p>Primary with text and icon</p>
            <UIButtons
              type="combined"
              variant="primary"
              text="Botón"
              icon={View}
            />
            <p>Secondary with text and icon</p>
            <UIButtons
              type="combined"
              variant="secondary"
              text="Botón"
              icon={View}
            />
            <p>Primary switcher with text and icon</p>
            <UIButtons
              type="combined"
              variant="primary"
              text="Botón"
              icon={View}
              switcher={
                isLoading ? { type: "loading", text: "Cargando..." } : null
              }
              onClick={() => setIsLoading(!isLoading)}
            />
            <p>Secondary switcher with text and icon</p>
            <UIButtons
              type="combined"
              variant="secondary"
              text="Botón"
              icon={View}
              switcher={
                isLoading ? { type: "loading", text: "Cargando..." } : null
              }
              onClick={() => setIsLoading(!isLoading)}
            />
            <p>Primary with text, icon and hover text/icon</p>
            <UIButtons
              type="combined"
              variant="primary"
              text="Botón"
              icon={View}
              hoverText="Texto Hover"
              hoverIcon={Plus}
            />
            <p>Secondary with text, icon and hover text/icon</p>
            <UIButtons
              type="combined"
              variant="secondary"
              text="Botón"
              icon={View}
              hoverText="Texto Hover"
              hoverIcon={Plus}
            />

            {/* Disabled Buttons */}
            <p>Primary disabled</p>
            <UIButtons
              variant="primary"
              text="Botón"
              switcher={{ type: "disabled" }}
            />
            <p>Secondary disabled</p>
            <UIButtons
              variant="secondary"
              text="Botón"
              switcher={{ type: "disabled" }}
            />
            <p>Icon primary disabled</p>
            <UIButtons
              type="icon"
              icon={View}
              switcher={{ type: "disabled" }}
            />
            <p>Icon secondary disabled</p>
            <UIButtons
              type="icon"
              variant="secondary"
              icon={View}
              switcher={{ type: "disabled" }}
            />
            <p>Combined primary disabled</p>
            <UIButtons
              type="combined"
              variant="primary"
              text="Botón"
              icon={View}
              switcher={{ type: "disabled" }}
            />
            <p>Combined secondary disabled</p>
            <UIButtons
              type="combined"
              variant="secondary"
              text="Botón"
              icon={View}
              switcher={{ type: "disabled" }}
            />
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
            <div className={`notification-success`}>
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
                notify("This is succes notification", "success", {
                  channel: "web",
                  duration: 1000,
                })
              }
            />
          </div>
          {/* Error */}
          <div className="flex flex-row gap-4">
            <div className={`notification-error`}>
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
          {/* Warnning */}
          <div className="flex flex-row gap-4">
            <div className={`notification-warning`}>
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
                notify("This is warning notification", "warning", {
                  channel: "web",
                  duration: 1000,
                })
              }
            />
          </div>
          {/* Info */}
          <div className="flex flex-row gap-4">
            <div className={`notification-info`}>
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
    </div>
  );
}
