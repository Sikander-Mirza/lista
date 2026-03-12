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
    // Better minification
    minify: 'esbuild',
    esbuildOptions: {
      drop: ['console', 'debugger'],
      pure: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      legalComments: 'none',
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    
    rollupOptions: {
      output: {
        // Better code splitting
        manualChunks: (id) => {
          // Node modules splitting
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            
            // UI libraries - split into smaller chunks
            if (id.includes('@headlessui')) {
              return 'vendor-headlessui';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('flowbite')) {
              return 'vendor-flowbite';
            }
            
            // Axios
            if (id.includes('axios')) {
              return 'vendor-axios';
            }
            
            // Lightbox - lazy loaded
            if (id.includes('yet-another-react-lightbox')) {
              return 'vendor-lightbox';
            }
            
            // Helmet
            if (id.includes('react-helmet')) {
              return 'vendor-helmet';
            }
            
            // Country selector - if this is the CSS issue
            if (id.includes('country') || id.includes('phone-input') || id.includes('react-phone')) {
              return 'vendor-phone';
            }
            
            // Redux (if used)
            if (id.includes('redux')) {
              return 'vendor-redux';
            }
            
            // All other node_modules
            return 'vendor-other';
          }
          
          // Split screens
          if (id.includes('/Screens/Admin/')) {
            return 'screen-admin';
          }
          if (id.includes('/Screens/Authentication/') || id.includes('/Screens/Login/') || id.includes('/Screens/Register/')) {
            return 'screen-auth';
          }
          if (id.includes('/Screens/ViewProperty/')) {
            return 'screen-property';
          }
        },
      },
      
      // Tree shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    
    // CSS
    cssCodeSplit: true,
    cssMinify: true,
    
    // Other options
    chunkSizeWarningLimit: 300,
    sourcemap: false,
    target: 'es2020',
    
    // Report compressed size
    reportCompressedSize: true,
  },
  
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
    exclude: ['yet-another-react-lightbox'],
  },
});