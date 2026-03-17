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
        // ✅ Ensure CSS loads in parallel with JS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash].css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        
        // ✅ Entry chunk naming
        entryFileNames: 'assets/[name]-[hash].js',
        
        // ✅ Dynamic chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        
        manualChunks(id) {
          // Core React — smallest possible initial chunk
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

          if (id.includes("axios")) {
            return "axios";
          }

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
    
    // ✅ Enable module preload polyfill
    modulePreload: {
      polyfill: true,
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "axios"],
    exclude: ["react-phone-input-2", "yet-another-react-lightbox"],
  },
});