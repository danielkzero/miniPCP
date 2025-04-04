import './main.css'
import 'boxicons'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'boxicons';
import 'boxicons/css/boxicons.min.css';
import Swal from 'sweetalert2';
import 'animate.css';

const app = createApp(App);

app.use(createPinia());
app.config.globalProperties.$swal = Swal;
app.use(router);

app.mount('#app');