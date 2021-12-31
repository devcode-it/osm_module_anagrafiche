import defineConfig from '@openstamanager/vite-config';
import path from 'node:path';
import url from 'node:url';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'resources/js/index.js'),
      formats: ['es'],
      fileName: 'index.js'
    },
    rollupOptions: {
      external: ['openstamanager']
    }
  }
});
