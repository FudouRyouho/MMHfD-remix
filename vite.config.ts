import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from "@vercel/remix/vite";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      presets: [vercelPreset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      /*
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("Helpers/BossTracker", "routes/Helpers/BossTracker.tsx");
          route("settings", "components/Layout/Settings/Settings.tsx");
          route("Guides/PentagramGuides", "routes/guides/PentagramGuides.tsx");
        });
      },*/
    }),
    tsconfigPaths(),
  ],
  build: {
    minify: "terser",
    rollupOptions: {
      treeshake: {
        moduleSideEffects: "no-external", // Optimiza el tree shaking para módulos externos
      },
    },
  },
});
