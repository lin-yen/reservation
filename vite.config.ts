import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: '@vue/compat',
    },
  },
  plugins: [vue(), eslintPlugin()],
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
