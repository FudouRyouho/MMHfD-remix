import React, { useState } from "react";

interface IProps {
  label: string;
  Icon: React.ElementType;
  children: React.ReactNode;
}



const SettingsCard: React.FC<IProps> = ({ label, Icon, children }) => {
  return (
    <div className="w-min h-min mb-4 text-center rounded border p-4 border-white/15">
      <div className="flex flex-row justify-between gap-4 pb-4">
        <div className="flex flex-row items-center gap-4">
          <Icon className="size-5" />
          <h3 className="text-lg font-medium">{label}</h3>
        </div>

      </div>
      

       <div className={``}>{children}</div>
    </div>
  );
};

export default SettingsCard;
