import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'bbog-commons-lib-secure-web-storage',
      formats: ['es', 'cjs'],
      fileName: 'bbog-commons-lib-secure-web-storage'
    },
    outDir: path.join(__dirname, 'build')
  },
  plugins: [dts({ rollupTypes: true })]
});
