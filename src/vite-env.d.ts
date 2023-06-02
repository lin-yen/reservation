/// <reference types="vite/client" />

declare module '@vuelidate/core';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      capitalize: (val: string) => string;
      prefix: (val: string) => string;
      parseDate: (val: Date) => string;
    };
  }
}

export {}; // Important! See note.
