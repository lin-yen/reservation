/// <reference types="vite/client" />

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      capitalize: (val: string) => string;
      prefix: (val: string) => string;
      parseDate: (val: Date) => string;
    };
  }
}

declare module 'vue' {
  import { CompatVue } from 'vue/runtime-dom';
  const Vue: CompatVue;
  export default Vue;
  export * from 'vue/runtime-dom';
  const { configureCompat } = Vue;
  export { configureCompat };
}

export {}; // Important! See note.
