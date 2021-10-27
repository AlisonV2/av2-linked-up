import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home';
import Artists from '../views/Artists';
import Conventions from '../views/Conventions';
import Categories from '../views/Categories';
import Login from '../views/Login';
import ArtistProfile from '../views/ArtistProfile';
import Admin from '../views/Admin';

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
    path: '/artist/:id',
    name: 'Profile',
    component: ArtistProfile
  },
  {
    path: '/conventions',
    name: 'Conventions',
    component: Conventions
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
