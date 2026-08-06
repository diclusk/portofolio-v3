import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
<<<<<<< HEAD
  base: '/portofolio-v3/',
=======
  base: './',
>>>>>>> ae14e8d4b0748ca05deb60912d946369d2fd64b2
  plugins: [react(), 
           tailwindcss()],
});
