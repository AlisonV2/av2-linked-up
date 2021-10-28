import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from './utils/firebase';
import './utils/styles';
import GlobalComponents from './utils/globals';
import 'bootstrap';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(GlobalComponents);
    app.mount('#app');
  }
});
