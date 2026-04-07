import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";
import prerender from "vite-plugin-prerender";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteReact(),
    prerender({
      staticDir: "dist",
      routes: ["/about-us"],
    }),
  ],

  build: {
    minify: "esbuild",
    esbuildOptions: {
      drop: ["console", "debugger"],
    },

    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-core": ["react", "react-dom", "react-router-dom"],
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
          "vendor-utils": ["axios", "react-helmet-async"],
          "vendor-optional": [
            "yet-another-react-lightbox",
            "react-phone-input-2",
          ],
        },
      },
    },

    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    target: "es2020",
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
  },
});