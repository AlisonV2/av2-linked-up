<template>
  <AdminNav v-if="requiresAuth" />
  <AppNavbar v-if="!requiresAuth" />
  <main>
    <router-view />
  </main>
  <AppFooter />
</template>

<script>
import AppNavbar from '@/components/nav/Navbar';
import AppFooter from '@/components/nav/Footer';
import AdminNav from '@/components/admin/AdminNav';

/**
 * @type Component
 * @name App
 * @vue-computed {boolean} requireAuth - Route guards
 * @vue-event {boolean} initLogin - Dispatch initLogin to store
 */
export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
    AdminNav,
  },
  computed: {
    requiresAuth() {
      if (this.$route.meta.requiresAuth) {
        return true;
      }
      return false;
    },
  },
  created() {
    this.$store.dispatch('initLogin');
  },
};
</script>
<style lang="scss">
main {
  min-height: 55vh;
}
</style>
