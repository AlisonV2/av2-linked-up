import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from './utils/firebase';
import GlobalComponents from './utils/globals';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import './utils/styles';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    Sentry.init({
      app,
      dsn: process.env.VUE_APP_SENTRY_DSN,
      integrations: [
        new Integrations.BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router),
          tracingOrigins: ['localhost', 'av2-linked-up.web.app', /^\//],
        }),
      ],
      tracesSampleRate: 0.2,
      trackComponents: true,
    });
    app.use(store);
    app.use(router);
    app.use(GlobalComponents);
    app.mount('#app');
  }
});
