import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { Provider } from "react-redux";
import store from "./store/store";
import SideBar from "./components/Layout/SideBar/SideBar";
import NotificationsContainer from "./components/Layout/Notifications/NotificationsContainer";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  //const { isExpanded } = useSidebar();
  return (
  
    <Provider store={store}>
      <div className="flex">
        <SideBar />
        <main className="transition-all w-screen duration-300 ease-in-out ml-16" id="main-content">
          <Outlet />
        </main>
      </div>
      <NotificationsContainer/>
    </Provider>
  
  );
}