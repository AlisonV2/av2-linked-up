<template>
  <div class="easter-egg" @mouseover.ctrl="getEgg"></div>
  <AdminNav v-if="requiresAuth" />
  <AppNavbar v-if="!requiresAuth" />
  <main>
    <router-view />
  </main>
  <teleport to="#modals">
    <AppModal :show="open" @hide="open = false">
      <template #title>Congrats! You found me 💗</template>
      <template #content>
        <img :src="require('@/assets/img/easter-egg.png')" class="easter-egg-img"/>
      </template>
    </AppModal>
  </teleport>
  <AppFooter />
</template>

<script>
import AppNavbar from '@/components/nav/Navbar';
import AppFooter from '@/components/nav/Footer';
import AdminNav from '@/components/admin/AdminNav';

/**
 * @exports App
 * @requires AppNavbar
 * @requires AppFooter
 * @requires AdminNav
 * @type {Component}
 * @vue-computed {boolean} requireAuth - Checks if current route requires authentication
 * @vue-event {boolean} initLogin - Dispatch initLogin to store on created() hook
 * @vue-event {boolean} getEgg - Triggers modal on ctrl + mouseover
 */
export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
    AdminNav,
  },
  data() {
    return {
      open: false,
    };
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
  methods: {
    getEgg() {
      this.open = true;
    }
  },
};
</script>
<style lang="scss">
main {
  min-height: 55vh;
}

.easter-egg {
  position: fixed;
  top: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
}

.easter-egg-img {
  height: 10rem;
  width: auto;
}
</style>
