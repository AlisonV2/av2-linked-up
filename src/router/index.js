import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Home from '../views/Home';
import Artists from '../views/Artists';
import Conventions from '../views/Conventions';
import Categories from '../views/Categories';
import Login from '../views/Login';
import ArtistProfile from '../views/ArtistProfile';
import Admin from '../views/Admin';
import AdminProfile from '../components/admin/AdminProfile';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/artists',
    name: 'Artists',
    component: Artists,
  },
  {
    path: '/artist/:id',
    name: 'Profile',
    component: ArtistProfile,
  },
  {
    path: '/conventions',
    name: 'Conventions',
    component: Conventions,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'profile',
        name: 'AdminProfile',
        component: AdminProfile,
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  if (store.state.auth.userLoggedIn) {
    next();
  } else {
    next({ name: 'Home' });
  }
});


export default router;
