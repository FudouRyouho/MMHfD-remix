import { useState } from "react";
import { Check, Square } from "../../icons/IconBase";
import { Checkbox, Field, Label } from "@headlessui/react";
import classNames from "classnames";

interface IProps<T extends string | number> {
  options: T[] | ReadonlyArray<T>;
  value: T[];
  onChange: (value: T[]) => void;
  position?: "flex-row" | "flex-col";
  label?: string;
}

const UICheckboxList = <T extends string | number>({
  options,
  value,
  onChange,
  position = "flex-col",
  label,
}: IProps<T>) => {
  const handleToggle = (option: T) => {
    const newSelection = value.includes(option)
      ? value.filter((item) => item !== option)
      : [...value, option];

    onChange(newSelection);
  };

  return (
    <div className={`check-box`}>
      {label && (
        <>
          <p className="text-lg text-primary">{label}</p>
          <div className="border-semi" />
        </>
      )}

      <div className="flex flex-nowrap">
        {Array.isArray(value) &&
          options.map((option) => (
            <Field key={String(option)} className="btn-body">
              <Checkbox
                checked={value.map(String).includes(String(option))}
                onChange={() => handleToggle(option)}
                className={"btn-check"}
              >
                {value.map(String).includes(String(option)) ? (
                  <Check size={16} className="text-primary" />
                ) : <Square size={16} className="text-primary" />}
              </Checkbox>
                   <Label className="text-secondary cursor-pointer">{option}</Label>     
            </Field>
          ))}
      </div>
    </div>
  );
};

export default UICheckboxList;
