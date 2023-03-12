import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  build: {
    // Relative to the root
    outDir: 'build',
  },
  server: {
    open: true,
    port: 3000,
  },
  define: {
    'process.env.VITE_API_URL': process.env.VITE_API_URL,
  },
});
