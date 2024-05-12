import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


// print
import print from 'vue3-print-nb';

const app = createApp(App);
app.use(router);
app.use(PerfectScrollbar);
app.use(createPinia());
app.use(VueTablerIcons);
app.use(Vue3Toastify, {
    autoClose: 3000, // default auto close time for toasts
  });
app.use(print);
app.use(VueApexCharts);
app.use(vuetify).mount('#app');
