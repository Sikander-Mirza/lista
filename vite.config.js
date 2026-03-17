import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteReact(),
  ],

  build: {
    minify: "esbuild",
    esbuildOptions: {
      drop: ["console", "debugger"],
      pure: ["console.log", "console.info", "console.debug", "console.warn"],
    },

    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React — smallest possible initial chunk
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-core";
          }

          // Router — needed for first navigation
          if (
            id.includes("react-router-dom") ||
            id.includes("react-router") ||
            id.includes("@remix-run")
          ) {
            return "router";
          }

          // Redux
          if (
            id.includes("react-redux") ||
            id.includes("@reduxjs/toolkit") ||
            id.includes("redux") ||
            id.includes("immer")
          ) {
            return "redux";
          }

          // Axios
          if (id.includes("axios")) {
            return "axios";
          }

          // These load ONLY when their lazy component is requested
          if (id.includes("@headlessui/react")) return "ui-headless";
          if (id.includes("lucide-react")) return "ui-icons";
          if (id.includes("flowbite-react") || id.includes("flowbite")) return "flowbite";
          if (id.includes("yet-another-react-lightbox")) return "lightbox";
          if (id.includes("react-phone-input-2")) return "phone-input";
          if (id.includes("react-helmet-async") || id.includes("helmet")) return "helmet";

          // Catch-all for remaining node_modules
          if (id.includes("node_modules")) return "vendor-misc";
        },
      },
    },

    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    target: "es2020",
    cssMinify: true,
    assetsInlineLimit: 2048,
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "axios"],
    exclude: ["react-phone-input-2", "yet-another-react-lightbox"],
  },
});