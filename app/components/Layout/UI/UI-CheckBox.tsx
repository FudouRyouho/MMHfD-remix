import { useState } from "react";
import { Check } from "../../icons/IconBase";

interface IProps<T extends string> {
  options: T[];
  value: T[];
  onChange: (value: T[]) => void;
}

const UICheckboxList = <T extends string>({ options, value, onChange }: IProps<T>) => {
  const handleToggle = (option: T) => {
    const newSelection = value.includes(option)
      ? value.filter((item) => item !== option)
      : [...value, option];

    onChange(newSelection);
  };

  return (
    <div className="bg-zinc-800 p-2 rounded-lg border border-white/5 flex flex-row flex-wrap">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 cursor-pointer p-2 hover:bg-white/10 rounded-lg"
        >
          <input
            type="checkbox"
            checked={value.includes(option)}
            onChange={() => handleToggle(option)}
            className="hidden"
          />
          <div className={`w-5 h-5 flex items-center justify-center border border-white/30 rounded ${value.includes(option) ? "bg-indigo-500" : "bg-zinc-700"}`}>
            {value.includes(option) && <Check className="size-4 text-white" />}
          </div>
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};

export default UICheckboxList;
