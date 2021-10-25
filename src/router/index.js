import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home';
import Artists from '../views/Artists';
import Conventions from '../views/Conventions';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/artists',
    name: 'Artists',
    component: Artists
  },
  {
    path: '/conventions',
    name: 'Conventions',
    component: Conventions
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
