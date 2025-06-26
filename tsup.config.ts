import { defineConfig } from 'tsup';

export default defineConfig({
  platform: 'node',
  entry: ['src'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  keepNames: true
});
