import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "~/components/icons/IconBase";
import { selectConfig, updateConfig } from "~/store/configSlince";
import { RootState } from "~/store/store";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const config = useSelector((state: RootState) => selectConfig(state));

  const isDarkMode = config.theme === "dark";

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    dispatch(updateConfig({ theme: newTheme }));
  };

  useEffect(() => {
    if (config.theme === "dark") {
      // Use config.theme here as well
      
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [config.theme]); // Depend on config.theme
  return (
    <>
      <Switch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        className="group flex w-20 h-max cursor-pointer rounded-full p-2 transition-colors duration-200 ease-in-out button border-[1px] border-black/20 dark:border-white/15"
      >
        <span
          aria-hidden="true"
          className="text-primary pointer-events-none inline-block translate-x-0 rounded-full transition duration-200 ease-in-out group-data-[checked]:translate-x-10"
        >
          {isDarkMode ?   <Moon size={16}/> : <Sun size={16}/>}
        </span>
      </Switch>
    </>
  );
};

export default DarkModeToggle;
