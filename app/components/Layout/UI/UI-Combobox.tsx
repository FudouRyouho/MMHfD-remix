import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, X } from "lucide-react";
import React from "react";

interface IProps<T extends string> {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

const UIComboBox = <T extends string>({
  label,
  options,
  value,
  onChange,
}: IProps<T>): React.ReactElement => {
  return (
    <>
      <Combobox value={value} onChange={onChange}>
        <ComboboxInput
          placeholder={label}
          displayValue={(value: T) => value}
          onChange={(event) => onChange?.(event.target.value as T)}
          className="group w-full bg-zinc-800 data-[active]:bg-white/15 data-[hover]:bg-white/15 border border-white/5 data-[hover]:border-indigo-500 data-[hover]:ring-indigo-500/20 data-[focus]:border-indigo-300 outline-none p-2 rounded transition-all duration-300 ease-in-out"
        />

        <ComboboxOptions
          className="group w-[var(--input-width)] absolute rounded-lg bg-zinc-800 transition duration-100 ease-in"
          transition
          anchor="bottom"
        >
          <div
            className="w-full rounded-lg p-1 border border-white/5 bg-white/5 
      focus:outline-none transition duration-100 ease-in"
          >
            {options.map((option) => (
              <ComboboxOption
                key={option}
                value={option}
                className="group grid grid-cols-2 text-center cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-white/15 data-[selected]:text-indigo-300"
              >
                <div className="justify-self-start">{option}</div>
                <Check className="invisible size-4 group-data-[selected]:visible justify-self-end" />
              </ComboboxOption>
            ))}
          </div>
        </ComboboxOptions>
      </Combobox>
    </>
  );
};

export default UIComboBox;
