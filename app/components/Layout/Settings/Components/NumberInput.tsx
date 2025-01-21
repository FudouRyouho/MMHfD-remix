import React from "react";
import { Input } from "@headlessui/react";
import { RotateCcw } from "lucide-react";
import useNotification from "../../Notifications/Utils/useNotification";
import { NotificationType } from "~/store/NotificationsSlice";
import UIButtons from "../../UI/UI-Button";

interface IProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  onReset: () => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  notifyOnReset?: {
    type: NotificationType;
    message: string;
  };
}

const NumberInput: React.FC<IProps> = ({
  label,
  value,
  onChange,
  onReset,
  min,
  max,
  step = 1,
  className = "",
  notifyOnReset,
}) => {
  const handleAddNotification = useNotification();

  const handleReset = () => {
    onReset();
    if (notifyOnReset) {
      handleAddNotification(notifyOnReset.type, notifyOnReset.message);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label className="text-sm">{label}</label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-24 bg-zinc-800 data-[hover]:bg-white/15 border border-white/5 data-[hover]:border-indigo-500 data-[hover]:ring-indigo-500/20 data-[focus]:border-indigo-300 outline-none p-2 rounded transition-all duration-300 ease-in-out"
      />
      <UIButtons variant="secondary" onClick={handleReset} icon={RotateCcw} />
    </div>
  );
};

export default NumberInput;
