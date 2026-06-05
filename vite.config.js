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
    // ✅ es2015 ensures react-snap's old Chromium can parse the JS
    target: "es2015",

    minify: "esbuild",
    esbuildOptions: {
      drop: ["console", "debugger"],
      // ✅ Transpile modern syntax to ES2015
      target: "es2015",
    },

    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-core": [
            "react",
            "react-dom",
            "react-router-dom",
          ],
          "vendor-state": [
            "react-redux",
            "@reduxjs/toolkit",
            "redux",
            "immer",
          ],
          "vendor-ui": [
            "@headlessui/react",
            "lucide-react",
            "flowbite-react",
            "flowbite",
          ],
          "vendor-utils": [
            "axios",
            "react-helmet-async",
          ],
          "vendor-optional": [
            "yet-another-react-lightbox",
            "react-phone-input-2",
          ],
        },
      },
    },

    cssCodeSplit: true,
    chunkSizeWarningLimit: 700,
    sourcemap: false,
    cssMinify: true,
    modulePreload: {
      polyfill: true,
    },
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "axios",
      "@headlessui/react",
    ],
    exclude: ["yet-another-react-lightbox", "react-phone-input-2"],
    esbuildOptions: {
      // ✅ Same target for dev deps
      target: "es2015",
    },
  },
});