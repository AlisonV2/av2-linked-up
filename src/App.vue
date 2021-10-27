<template>
  <AdminNav v-if="isUser"/>
  <AppNavbar v-if="!isUser"/>
   <main>
    <router-view />
  </main>
  <AppFooter />
</template>

<script>
import AppNavbar from '@/components/nav/Navbar';
import AppFooter from '@/components/nav/Footer';
import AdminNav from '@/components/admin/AdminNav';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
    AdminNav
  },
  computed: {
    isUser() {
      if (this.$route.meta.isUser) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style lang="scss">
main {
  min-height: 55vh;
}
</style>
