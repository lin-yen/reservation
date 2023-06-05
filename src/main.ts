import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue } from 'bootstrap-vue';
import router from './router';
import filters from './filters';

// Custom Css
import 'src/assets/scss/main.scss';

const app = createApp(App);

app.use(filters);

app.use(router);

app.use(BootstrapVue as any);

app.mount('#app');
