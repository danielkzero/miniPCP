import './main.css'
import 'boxicons'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'boxicons';
import 'boxicons/css/boxicons.min.css';

import PrimeVue from "primevue/config";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Steps from 'primevue/steps';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import AutoComplete from 'primevue/autocomplete';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import ColumnGroup from "primevue/columngroup";
const app = createApp(App);

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Row', Row);
app.component('Steps', Steps);
app.component('Dialog', Dialog);
app.component('Card', Card);
app.component('AutoComplete', AutoComplete);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('ColumnGroup', ColumnGroup);
app.use(PrimeVue, {
    theme: 'none'
});

app.use(createPinia());
app.use(router);

app.mount('#app');