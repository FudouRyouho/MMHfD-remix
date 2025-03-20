import { Button } from "@headlessui/react";
import { Loader } from "../../icons/IconBase";
import React from "react";

type UIButtonsType = "normal" | "icon" | "combined";
type UIButtonsVariant = "primary" | "secondary";

type SwitcherState =
  | { type: "loading"; text?: string }
  | { type: "disabled" ; text?: string }
  | { type: "custom"; icon?: React.ElementType; text?: string }
  | null;

interface IProps {
  type?: UIButtonsType;
  variant?: UIButtonsVariant;
  text?: string;
  icon?: React.ElementType;
  iconSize?: number;
  className?: string;
  onClick?: () => void;
  switcher?: SwitcherState;
  hoverIcon?: React.ElementType;
  hoverText?: string;
}

const typeStyles: Record<UIButtonsType, Record<UIButtonsVariant, string>> = {
  normal: {
    primary:
      "group btn-primary",
    secondary:
      "group btn-secondary",
  },
  icon: {
    primary:
      "group btn-primary btn-icon",
    secondary:
      "group btn-secondary btn-icon",
  },
  combined: {
    primary:
      "group inline-flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white px-4 py-2 rounded transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "group bg-white/5 hover:bg-white/15 active:bg-white/10 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white hover:text-indigo-300 px-4 py-2 rounded transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
  },
};

const iconStyles: Record<UIButtonsVariant, string> = {
  primary: "btn-icon",
  secondary:
    "btn-iconSecondary",
};

const textStyle: Record<UIButtonsVariant, string> = {
  primary: "transition-all duration-300",
  secondary: "group-active:text-indigo-500 transition-all duration-300",
};

const UIButtons: React.FC<IProps> = ({
  type = "normal",
  variant = "primary",
  text,
  icon: Icon,
  iconSize = 20,
  className = "",
  onClick,
  switcher,
  hoverIcon: HoverIcon,
  hoverText,
}) => {

  const getButtonState = (): { type: string; text?: string; icon?: React.ElementType } | null => {
    if (typeof switcher === "boolean") {
      return switcher ? { type: "disabled" } : null; // Manejo del booleano
    } else if (switcher?.type === "loading") {
      return { type: "loading", text: switcher.text || "Cargando..." };
    } else if (switcher?.type === "disabled") {
      return { type: "disabled", text: switcher.text };
    } else if (switcher?.type === "custom") {
      return { type: "custom", icon: switcher.icon, text: switcher.text };
    }
    return null;
  };

  const buttonState = getButtonState();
  const isDisabled = buttonState?.type === "disabled";
  const isLoading = buttonState?.type === "loading";
  const isCustom = buttonState?.type === "custom"; // Nuevo estado para custom
  const buttonIcon = buttonState?.icon; // Icono para el estado custom
  const buttonText = buttonState?.text || text; // Prioriza texto de switcher, luego prop text.

  const content = (
    <>
      {isLoading && <Loader className="animate-spin" size={iconSize} />}
      {isCustom && buttonIcon && React.createElement(buttonIcon, { className: iconStyles[variant], size: iconSize })} {/* Usamos React.createElement */}
      {buttonText && <span className={textStyle[variant]}>{buttonText}</span>}
    </>
  );

  return (
    <Button
      className={`flex flex-row gap-2 items-center ${typeStyles[type][variant]} ${className} group`}
      onClick={!isDisabled && !isLoading ? onClick : undefined} // Evita onClick en disabled o loading. Mejor UX.
      disabled={isDisabled || isLoading}
    >
      {content}
      {(HoverIcon || hoverText) && (
        <span className="hidden group-hover:opacity-100 group-hover:flex items-center gap-2 justify-center">
          {HoverIcon && <HoverIcon className={iconStyles[variant]} size={iconSize} />}
          {hoverText && <span className={textStyle[variant]}>{hoverText}</span>}
        </span>
      )}
    </Button>
  );
};

export default UIButtons;
