import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectConfig, updateConfig } from "~/store/configSlince";
import type { RootState } from "~/store/store";
import Masonry from "react-masonry-css";
import SettingsCard from "./Components/Settings-card";
import { Bell, Skull } from "~/components/icons/IconBase";
import { bosses, SERVER_GROUPS, ServerTypeName } from "~/lib/types";
import UICheckboxList from "../UI/UI-CheckBox";
import useHydratedData from "~/hooks/useHydratedData"; // Importa el custom hook

interface IProps {}

const Settings: React.FC<IProps> = ({}) => {
  const dispatch = useDispatch();
  const config = useSelector((state: RootState) => selectConfig(state));

  const bossNotificationsConfigFromStore = useSelector(
    // Obtén los datos *antes* del hook
    (state: RootState) => state.config.notifications.bossNotifications
  );

  const { data: bossNotificationsConfig, isLoading } = useHydratedData(() => {
    return bossNotificationsConfigFromStore; // Pasa los datos al hook
  });

  const handleServerChange = (
    bossName: string,
    servers: ServerTypeName[],
    notificationType: "respawn" | "die"
  ) => {
    dispatch(
      updateConfig({
        notifications: {
          global: config.notifications.global,
          bossNotifications: {
            ...bossNotificationsConfig, // Clona *todo* bossNotifications para mantener las otras propiedades
            [notificationType]: {
              // Usa notificationType para acceder a respawn o die
              ...bossNotificationsConfig[notificationType], // Clona la parte específica (respawn o die)
              [bossName]: {
                ...bossNotificationsConfig[notificationType][bossName], // Clona la config del boss
                servers,
              },
            },
          },
        },
      })
    );
  };

  const breakpointColumns = {
    default: 5,
    840: 2,
    1140: 2,
    1440: 3,
    1740: 4,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex flex-auto w-full gap-4"
    >
      <SettingsCard label="Boss Tracker" Icon={Skull}>
               
        {!isLoading &&
          bossNotificationsConfig?.respawn &&
          bosses.map((bossName) => (
            <div className="flex flex-wrap flex-row" key={bossName}>
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-sm text-center text-nowrap pb-2">
                  {bossName}
                </h2>

                <UICheckboxList
                  options={Object.keys(SERVER_GROUPS) as ServerTypeName[]}
                  value={
                    bossNotificationsConfig.respawn?.[bossName]?.servers || []
                  }
                  onChange={(servers) =>
                    handleServerChange(bossName, servers, "respawn")
                  }
                  position="flex-row"
                  label="respawn notification"
                />

                <UICheckboxList
                  options={Object.keys(SERVER_GROUPS) as ServerTypeName[]}
                  value={bossNotificationsConfig.die[bossName]?.servers || []} // Accede a die
                  onChange={(servers) =>
                    handleServerChange(bossName, servers, "die")
                  }
                  position="flex-row"
                  label="die notification"
                />
              </div>

              <div className="w-[80%] h-[1px] bg-white/10 my-2 mx-4" />
            </div>
          ))}
             
      </SettingsCard>
    </Masonry>
  );
};

export default Settings;
