import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";
import preload from "vite-plugin-preload";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteReact(),
    // ✅ Auto-inject preload links for critical assets
    preload({
      include: ['**/*.css', '**/react-core-*.js', '**/router-*.js'],
    }),
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
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-core";
          }

          if (
            id.includes("react-router-dom") ||
            id.includes("react-router") ||
            id.includes("@remix-run")
          ) {
            return "router";
          }

          if (
            id.includes("react-redux") ||
            id.includes("@reduxjs/toolkit") ||
            id.includes("redux") ||
            id.includes("immer")
          ) {
            return "redux";
          }

          if (id.includes("axios")) return "axios";
          if (id.includes("@headlessui/react")) return "ui-headless";
          if (id.includes("lucide-react")) return "ui-icons";
          if (id.includes("flowbite-react") || id.includes("flowbite")) return "flowbite";
          if (id.includes("yet-another-react-lightbox")) return "lightbox";
          if (id.includes("react-phone-input-2")) return "phone-input";
          if (id.includes("react-helmet-async")) return "helmet";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },

    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    target: "es2020",
    cssMinify: true,
    assetsInlineLimit: 2048,
    modulePreload: {
      polyfill: true,
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "axios"],
    exclude: ["react-phone-input-2", "yet-another-react-lightbox"],
  },
});