import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue } from 'bootstrap-vue';
import router from './router';
import setGlobalFilters from './filters';

// Custom Css
import 'src/assets/scss/main.scss';

const app = createApp(App);

setGlobalFilters(app);

app.use(router).use(BootstrapVue as any);

app.mount('#app');
