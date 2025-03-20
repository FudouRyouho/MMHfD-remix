import React, { useState, useEffect } from "react";
import { Button, Transition } from "@headlessui/react";
import { Link, useLocation } from "@remix-run/react";
import {
  Book,
  ChevronLeft,
  ChevronRight,
  Diamond,
  House,
  List,
  Pentagon,
  Settings,
  Skull,
  SquareMousePointer,
} from "~/components/icons/IconBase";
import { useSidebar } from "./sidebarContext";
import DarkModeToggle from "../UI/DarkMode";
import classNames from "classnames";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { icon: House, label: "Home", href: "/" },
  {
    icon: SquareMousePointer,
    label: "Helpers",
    children: [
      { icon: Skull, label: "Boss Tracker", href: "/Helpers/BossTracker" },
    ],
  },
  {
    icon: Book,
    label: "Guides",
    children: [
      { icon: Pentagon, label: "Pentagram", href: "/Guides/PentagramGuides" },
      { icon: Diamond, label: "Seeds", href: "/Guides/Seeds" },
    ],
  },
];

const SideBar: React.FC = () => {
  const { isExpanded, toggleSidebar } = useSidebar();
  const [currentItems, setCurrentItems] = useState(menuItems);
  const [history, setHistory] = useState<MenuItem[][]>([]);
  const location = useLocation();

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

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      setHistory((prev) => [...prev, currentItems]);
      setCurrentItems(item.children);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousItems = history[history.length - 1];
      setCurrentItems(previousItems);
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  return (
    <aside className={` ${isExpanded ? "w-48" : "w-18"} sidebar`}>
      <div className="sidebar-body">
        <div className="frame">
          {isExpanded && <DarkModeToggle />}

          <Button onClick={toggleSidebar} className="btn-back">
          {isExpanded ? <ChevronLeft size={28}/> : <ChevronRight size={28}/>}
          </Button>
        </div>
        <nav className="flex-grow">
          {isExpanded && history.length > 0 && (
            <button onClick={handleBack} className="sidebar-body-item">
              
              <ChevronLeft size={18} />
              <span className="ml-3">Back</span>
            </button>
          )}
          <ul>
            {currentItems.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    to={item.href}
                    className={classNames(
                      "sidebar-body-item",
                      {
                        "bg-zinc-200 dark:bg-zinc-600":
                          location.pathname === item.href,
                      },
                      { "justify-center": !isExpanded }
                    )}
                  >
                    <item.icon size={18} />
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
                ) : (
                  <div
                    className={classNames('sidebar-body-item', {'justify-center' : !isExpanded})}
                    onClick={() => handleItemClick(item)}
                  >
                    <item.icon size={18} />
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
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to={"Settings"}
            className={classNames(
              "sidebar-body-item",
              {
                "bg-zinc-200 dark:bg-zinc-600":
                  location.pathname === "/Settings",
              },
              { "justify-center": !isExpanded }
            )}
          >
            <Settings size={18} />
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
  );
};

export default SideBar;
