import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import flowbiteReact from "flowbite-react/plugin/vite";
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteReact(),
    // Add gzip + brotli compression
    compression({
      algorithm: 'gzip',
      threshold: 1024,
    }),
    compression({
      algorithm: 'brotliCompress',
      threshold: 1024,
    }),
  ],
  
  build: {
    minify: 'esbuild',
    esbuildOptions: {
      drop: ['console', 'debugger'],
      // Tree-shake pure function calls
      pure: ['console.log', 'console.info', 'console.debug'],
    },
    
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React — keep tiny, loads first
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          
          // Router — needed for initial navigation
          if (id.includes('react-router-dom') || id.includes('react-router')) {
            return 'router';
          }
          
          // Redux — needed for store
          if (id.includes('react-redux') || 
              id.includes('@reduxjs/toolkit') || 
              id.includes('redux')) {
            return 'redux';
          }
          
          // Axios — API calls (can load slightly later)
          if (id.includes('axios')) {
            return 'axios';
          }
          
          // UI libraries — defer these, NOT needed for first paint
          if (id.includes('@headlessui/react')) {
            return 'ui-headless';
          }
          
          if (id.includes('lucide-react')) {
            return 'ui-icons';
          }
          
          // Heavy libraries — lazy loaded only when needed
          if (id.includes('flowbite-react')) {
            return 'flowbite';
          }
          
          if (id.includes('yet-another-react-lightbox')) {
            return 'lightbox';
          }
          
          if (id.includes('react-phone-input-2')) {
            return 'phone-input';
          }
          
          if (id.includes('react-helmet-async')) {
            return 'helmet';
          }
          
          // All other node_modules
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
      },
    },
    
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    target: 'es2020',
    // Enable CSS minification
    cssMinify: true,
    // Reduce asset inlining threshold (smaller initial HTML)
    assetsInlineLimit: 2048,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
    exclude: ['react-phone-input-2', 'yet-another-react-lightbox'],
  },
});