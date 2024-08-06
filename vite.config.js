import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': '/src',
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@pages': '/src/pages',
      '@constants': '/src/constants',
      '@helpers': '/src/helpers',
      '@layouts': '/src/layouts',
      '@context': '/src/context',
    },
  },
});
