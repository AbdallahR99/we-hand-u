/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'path';
// import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         includePaths: [
  //           resolve(__dirname, 'src/assets/styles'),
  //           '@assets/styles',
  //         ],
  //       },
  //     },
  //   },
  // },
  // css: {
  //   preprocessorOptions: {
  //     includePaths: [resolve(__dirname, 'src/assets/styles'), '@assets/styles'],
  //     css: {
  //       includePaths: [
  //         resolve(__dirname, 'src/assets/styles'),
  //         '@assets/styles',
  //       ],
  //     },
  //     scss: {
  //       api: 'modern-compiler', // or "modern",
  //       includePaths: [
  //         resolve(__dirname, 'src/assets/styles'),
  //         '@assets/styles',
  //       ],
  //     },
  //   },
  // },

  css: {
    preprocessorOptions: {
      scss: {
        // api: 'modern-compiler', // or "modern",
        includePaths: ['src/assets/styles'],
      },
    },
  },
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
    alias: {
      '@': resolve(__dirname, 'src'),
      '@core': resolve(__dirname, 'src/app/core'),
      '@pages': resolve(__dirname, 'src/app/pages'),
      '@environments': resolve(__dirname, 'src/app/environments'),
      '@app': resolve(__dirname, 'src/app'),
      '@server': resolve(__dirname, 'src/server'),
    },
  },

  plugins: [
    viteTsConfigPaths(),

    analog({
      nitro: {
        preset: 'node-server',

        // rollupConfig: {
        //   plugins: [
        //     typescriptPaths({
        //       tsConfigPath: 'tsconfig.json',
        //       preserveExtensions: true,
        //     }) as any,
        //   ],
        // },
      },
    }),
    angular({
      inlineStylesExtension: 'scss',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
