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
    },

    rollupOptions: {
      output: {
        // ✅ SIMPLIFIED chunking — fewer, larger chunks load faster
        manualChunks: {
          // Core vendor — loads first
          'vendor-core': [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          
          // State management
          'vendor-state': [
            'react-redux',
            '@reduxjs/toolkit',
            'redux',
            'immer',
          ],
          
          // UI libraries — single chunk
          'vendor-ui': [
            '@headlessui/react',
            'lucide-react',
            'flowbite-react',
            'flowbite',
          ],
          
          // Utilities
          'vendor-utils': [
            'axios',
            'react-helmet-async',
          ],
          
          // Heavy optional libraries (loaded only when needed)
          'vendor-optional': [
            'yet-another-react-lightbox',
            'react-phone-input-2',
          ],
        },
      },
    },

    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    target: "es2020",
    cssMinify: true,
    
    // ✅ Ensure module preloading works correctly
    modulePreload: {
      polyfill: true,
    },
  },

  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'axios',
      '@headlessui/react',
    ],
    exclude: ['yet-another-react-lightbox', 'react-phone-input-2'],
  },
});