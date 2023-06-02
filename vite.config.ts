import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import eslintPlugin from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';
import * as path from 'path';
import Components from 'unplugin-vue-components/vite';
import { BootstrapVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: '@vue/compat',
      src: path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2,
          },
        },
      },
    }),
    eslintPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    Components({
      resolvers: [BootstrapVueResolver()],
      dts: true, // enabled by default if `typescript` is installed
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 16,
          propList: ['*'],
        }),
        autoprefixer({
          overrideBrowserslist: ['last 2 versions'],
          grid: true,
        }),
      ],
    },
  },
});
