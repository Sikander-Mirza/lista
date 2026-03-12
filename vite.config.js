// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteReact(),
  ],
  
  build: {
    minify: 'esbuild',
    esbuildOptions: {
      drop: ['console', 'debugger'],
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@headlessui/react', 'lucide-react'],
          'vendor-flowbite': ['flowbite-react'],
          'vendor-utils': ['axios'],
          'vendor-lightbox': ['yet-another-react-lightbox'],
          'vendor-phone': ['react-phone-input-2'],
        },
      },
    },
    
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    target: 'es2020',
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
    exclude: ['react-phone-input-2'],
  },
});