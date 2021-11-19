import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Home from '../views/Home';
import Artists from '../views/Artists';
import Conventions from '../views/Conventions';
import Categories from '../views/Categories';
import CategoriesResults from '../views/CategoriesResults';
import GeoResults from '../views/GeoResults';
import Login from '../views/Login';
import ArtistProfile from '../views/ArtistProfile';
import Admin from '../views/Admin';
import AdminProfile from '../components/admin/AdminProfile';
import AdminGallery from '../components/admin/AdminGallery';
import AdminInbox from '../components/admin/AdminInbox';
import AdminProjects from '../components/admin/AdminProjects';
import AdminEvents from '../components/admin/AdminEvents';
import ClientProfile from '../views/ClientProfile';
import ArtistContact from '../views/ArtistContact';
import ProjectDetails from '../components/admin/ProjectDetails';
import MessageDetails from '../components/admin/MessageDetails';
import NewEvent from '../components/organizers/NewEvent';
import Event from '../views/Event';
import EventDetails from '../components/organizers/EventDetails';

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
    path: '/artist/contact',
    name: 'ArtistContact',
    component: ArtistContact,
  },
  {
    path: '/client/:id',
    name: 'ClientProfile',
    component: ClientProfile,
  },
  {
    path: '/conventions',
    name: 'Conventions',
    component: Conventions,
  },
  {
    path: '/conventions/:id',
    name: 'Event',
    component: Event,
  },
  {
    path: '/styles',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/search/styles',
    name: 'CategoriesResults',
    component: CategoriesResults,
  },
  {
    path: '/search/city',
    name: 'GeoResults',
    component: GeoResults,
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
      requiresAuth: true,
    },
    children: [
      {
        path: 'profile',
        name: 'AdminProfile',
        component: AdminProfile,
      },
      {
        path: 'gallery',
        name: 'AdminGallery',
        component: AdminGallery,
      },
      {
        path: 'inbox',
        name: 'AdminInbox',
        component: AdminInbox,
      },
      {
        path: 'inbox/:id',
        name: 'MessageDetails',
        component: MessageDetails,
      },
      {
        path: 'projects',
        name: 'AdminProjects',
        component: AdminProjects,
      },
      {
        path: 'projects/:id',
        name: 'ProjectDetails',
        component: ProjectDetails,
      },
      {
        path: 'events',
        name: 'AdminEvents',
        component: AdminEvents,
      },
      {
        path: 'events/:id',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'new-event',
        name: 'NewEvent',
        component: NewEvent,
      },
    ],
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
