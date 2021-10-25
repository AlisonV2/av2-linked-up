<template>
  <AppNavbar />
  <router-view />
  <AppFooter />
</template>

<script>
import AppNavbar from '@/components/nav/Navbar';
import AppFooter from '@/components/nav/Footer';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter
  },
};
</script>