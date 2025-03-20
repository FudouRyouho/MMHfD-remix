import React, { useState } from "react";

interface IProps {
  label: string;
  Icon: React.ElementType;
  children: React.ReactNode;
}

const SettingsCard: React.FC<IProps> = ({
  label,
  Icon,
  children,
}) => {
  return (
    <>
      <div className="w-min mb-4 text-center rounded border p-4 border-white/15 select-none">
        <div className="inline-block pb-4">
          <div className="flex flex-row items-center gap-4">
            <Icon className="size-5" />
            <h3 className="inline-block text-lg font-medium text-nowrap">
              {label}
            </h3>
          </div>
        </div>

        <div
          className={`flex flex-wrap`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SettingsCard;

//<div className={`flex ${direction === 'horizontal' ? 'flex-row gap-4 pb-4' : 'flex-col gap-4' } flex-wrap`}>{children}</div>
