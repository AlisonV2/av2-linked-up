import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home';
import Artists from '../views/Artists';
import Conventions from '../views/Conventions';
import Login from '../views/Login';

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
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
