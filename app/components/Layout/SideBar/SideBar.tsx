import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Link, useLocation } from "@remix-run/react";
import {
  House,
  List,
  Palette,
  Settings,
} from "../../icons/IconBase";

interface IProps {}

const SideBar: React.FC<IProps> = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: House, label: "Home", href: "/" },
    { icon: House, label: "Boss Tracker", href: "bossTracker" },
    { icon: Palette, label: "Style", href: "/style" },
  ];

  useEffect(() => {
    const appContainer = document.getElementById("main-content");
    if (appContainer) {
      if (isExpanded) {
        appContainer.classList.remove("ml-16");
        appContainer.classList.add("ml-48");
      } else {
        appContainer.classList.remove("ml-48");
        appContainer.classList.add("ml-16");
      }
    }
  }, [isExpanded]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out ${
          isExpanded ? "w-48" : "w-16"
        } bg-zinc-50 dark:bg-zinc-800`}
      >
        <div className="flex flex-col h-full px-3 py-4">
          <button
            onClick={toggleSidebar}
            className="self-end p-2 mb-4 text-gray-500 rounded-lg hover:bg-zinc-100 dark:text-gray-400 dark:hover:bg-zinc-700"
          >
            <List //size={24} 
            />
          </button>
          <nav className="flex-grow">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
                      location.pathname === item.href
                        ? "bg-zinc-200 dark:bg-zinc-600"
                        : ""
                    }`}
                  >
                    <item.icon //size={20} 
                    />
                    <Transition
                      show={isExpanded}
                      enter="transition-opacity duration-200"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <span className="ml-3">{item.label}</span>
                    </Transition>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to={"settings"}
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
                location.pathname === '/settings'
                  ? "bg-zinc-200 dark:bg-zinc-600"
                  : ""
              }`}
            >
              <Settings //size={20} 
         
              />
              <Transition
                show={isExpanded}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <span className="ml-3">Settings</span>
              </Transition>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
