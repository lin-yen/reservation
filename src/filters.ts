import { App } from 'vue';

export default {
  install: (app: App) => {
    // Filter
    app.config.globalProperties.$filters = {
      // Capitilazes the first chars in words
      capitalize(val: string): string {
        if (!val) {
          return '';
        }

        return val
          .toString()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      },

      // Capitilazes the first chars in words
      prefix(val: string): string {
        if (!val) {
          return '';
        }

        return `Mr. ${val}`;
      },

      // Parse date into local string
      parseDate(val: Date): string {
        if (!val) {
          return '';
        }

        return val.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });
      },
    };
  },
};
