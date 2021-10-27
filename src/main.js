import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './utils/styles';
import GlobalComponents from './utils/globals';
import 'bootstrap';

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(GlobalComponents)
  .mount('#app');
