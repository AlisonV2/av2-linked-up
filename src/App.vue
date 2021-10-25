<template>
  <AppNavbar />
  <main>
    <router-view />
  </main>
  <AppFooter />
</template>

<script>
import AppNavbar from '@/components/nav/Navbar';
import AppFooter from '@/components/nav/Footer';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
  },
};
</script>
<style lang="scss">
main {
  min-height: 55vh;
}
</style>
