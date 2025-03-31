import './main.css'
import 'boxicons'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'boxicons';
import 'boxicons/css/boxicons.min.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');