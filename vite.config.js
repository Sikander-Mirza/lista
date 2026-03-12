// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteReact(),
  ],
  
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log in production
        drop_debugger: true,
      },
    },
    
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          
          // UI libraries
          'vendor-ui': ['@headlessui/react', 'lucide-react', 'flowbite-react'],
          
          // Utility libraries
          'vendor-utils': ['axios'],
          
          // Lightbox (only loaded when needed)
          'vendor-lightbox': ['yet-another-react-lightbox'],
        },
      },
    },
    
    // Chunk size warning
    chunkSizeWarningLimit: 500,
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // No source maps in production
    sourcemap: false,
    
    // Target modern browsers
    target: 'es2020',
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'axios',
    ],
    exclude: ['yet-another-react-lightbox'], // Lazy load this
  },
  
  // Server options for development
  server: {
    open: true,
    cors: true,
  },
  
  // Preview options
  preview: {
    port: 4173,
  },
});