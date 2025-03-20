import { Button, Input } from "@headlessui/react";
import React, { useState } from "react";
import { Check, Plus, X } from "~/components/icons/IconBase";
import UIButtons from "~/components/Layout/UI/UI-Button";
import UIListBox from "~/components/Layout/UI/UI-SelectList";

interface IProps {}
const DashBoard: React.FC<IProps> = ({}) => {
  const tags = ["tag1", "tag2", "tag3","tag4", "tag5"];

  const [selected, setSelected] = useState(tags[0]);
  const [selected2, setSelected2] = useState(tags[4]);

  return (
    <div className="p-4 w-full h-full">
      <div className="border-2 border-blue-500 ">
        <div className="flex flex-col gap-4 items-center px-8 py-4 bg-white/5">
          <div className="w-full flex justify-between px-2">
            <h1 className="text-base p-2">Añadir nuevo miembro</h1>
            <UIButtons icon={X} type="combined" variant="secondary" />
          </div>

          <Input
            type="text"
            value="Personaje Principal"
            className="w-full bg-zinc-800 data-[hover]:bg-white/15 border border-white/5 data-[hover]:border-indigo-500 data-[hover]:ring-indigo-500/20 data-[focus]:border-indigo-300 outline-none p-2 rounded transition-all duration-300 ease-in-out"
          />
          <div className="flex flex-row w-full gap-2">
            <Input
              type="text"
              value="Mula 1"
              className="w-full bg-zinc-800 data-[hover]:bg-white/15 border border-white/5 data-[hover]:border-indigo-500 data-[hover]:ring-indigo-500/20 data-[focus]:border-indigo-300 outline-none p-2 rounded transition-all duration-300 ease-in-out"
            />

            <UIListBox
              label={selected}
              options={tags}
              value={selected}
              onChange={setSelected}
            />
            <UIButtons icon={X} type="combined" variant="secondary" />
          </div>
          <div className="flex flex-row w-full gap-2">
            <Input
              type="text"
              value="Nombre del otro personaje..."
              className="w-full bg-zinc-800 data-[hover]:bg-white/15 border border-white/5 data-[hover]:border-indigo-500 data-[hover]:ring-indigo-500/20 data-[focus]:border-indigo-300 outline-none p-2 rounded transition-all duration-300 ease-in-out"
            />
            <UIListBox
              label={selected2}
              options={tags}
              value={selected2}
              onChange={setSelected2}
            />
            <UIButtons icon={X} type="combined" variant="secondary" />
          </div>
          <div className="w-full flex flex-row justify-between px-16">
            <UIButtons icon={Plus} variant="primary" />
            <UIButtons icon={Plus} variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
