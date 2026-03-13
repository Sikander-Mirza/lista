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
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) return 'vendor-react-dom';
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('react') && !id.includes('react-')) return 'vendor-react';
            if (id.includes('@headlessui')) return 'vendor-headless';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('flowbite')) return 'vendor-flowbite';
            if (id.includes('axios')) return 'vendor-axios';
            if (id.includes('yet-another-react-lightbox')) return 'vendor-lightbox';
            if (id.includes('react-phone-input')) return 'vendor-phone';
            if (id.includes('redux')) return 'vendor-redux';
            if (id.includes('helmet')) return 'vendor-helmet';
            if (id.includes('hook-form')) return 'vendor-form';
          }
        },
      },
    },
    
    cssCodeSplit: true,
    cssMinify: true,
    chunkSizeWarningLimit: 300,
    sourcemap: false,
    target: 'esnext',
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['yet-another-react-lightbox', 'react-phone-input-2'],
  },
});