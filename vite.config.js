import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/portofolio-v3-fresh/',
  plugins: [react(), 
           tailwindcss()],
});
