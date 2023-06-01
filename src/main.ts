import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import router from './router';

createApp(App)
  .use(router)
  .use(BootstrapVue as any)
  .use(BootstrapVueIcons as any)
  .mount('#app');
