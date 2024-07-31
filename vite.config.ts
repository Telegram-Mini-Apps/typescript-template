import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  base: '/typescript-template',
  plugins: [
    // Allows using the compilerOptions.paths property in tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
    // Allows using self-signed certificates to run the dev server using HTTPS.
    // https://www.npmjs.com/package/@vitejs/plugin-basic-ssl
    // basicSsl(),
  ],
  build: {
    target: 'esnext',
  },
  publicDir: './public',
  server: {
    // Uncomment this line if you want to expose your dev server and access it from the devices
    // in the same network.
    // host: true,
  },
});
