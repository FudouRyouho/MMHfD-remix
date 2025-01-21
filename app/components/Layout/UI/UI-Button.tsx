import { Button } from "@headlessui/react";
import { Loader, X } from "lucide-react";
import React from "react";

type UIButtonsType = "normal" | "icon" | "combined";
type UIButtonsVariant = "primary" | "secondary";

interface IProps {
  type?: UIButtonsType;
  variant?: UIButtonsVariant;
  text?: string;
  icon?: React.ElementType;
  iconSize?: number;
  className?: string
  onClick?: () => void;
  switcher?: boolean;
  switcherText?: string;
  disabled?: boolean
}

const typeStyles: Record<UIButtonsType, Record<UIButtonsVariant, string>> = {
  normal: {
    primary:
      "group inline-flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white px-4 py-2 rounded transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "group bg-white/5 hover:bg-white/15 active:bg-white/10 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white hover:text-indigo-300 px-4 py-2 rounded transition-all duration-200 ease-in-out",
  },
  icon: {
    primary:
      "group inline-flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white w-10 h-10 rounded transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "group inline-flex items-center justify-center bg-white/5 hover:bg-white/15 active:bg-white/10 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-white hover:text-indigo-300 w-10 h-10 rounded transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
  },
  combined: {
    primary: "",
    secondary: "",
  },
};

const iconStyles: Record<UIButtonsVariant, string> = {
  primary:
    "transition-transform duration-200 ease-in-out group-hover:scale-110",
  secondary:
    "group-active:text-indigo-500 transition-all duration-300 group-hover:scale-110",
};

const textStyle: Record<UIButtonsVariant, string> = {
    primary: 'transition-colors duration-300',
    secondary: 'group-active:text-indigo-500 transition-colors duration-300'
}

const UIButtons: React.FC<IProps> = ({
  type = "normal",
  variant = "primary",
  text,
  icon: Icon,
  iconSize = 20,
  className = '',
  onClick,
  switcher = false,
  switcherText,
  disabled = false,
}) => {
  return (
    <Button
      className={`${typeStyles[type][variant]} ${className}`}
      onClick={onClick}
      disabled={switcher || disabled}
    >
      {switcher ? (
        <Loader className="animate-spin" size={iconSize} />
      ) : Icon ? (
        <Icon className={iconStyles[variant]} size={iconSize} />
      ) : null}
      {switcher ? switcherText : text ? <span className={textStyle[variant]}>{text}</span> : null}
    </Button>
  );
};

export default UIButtons;
