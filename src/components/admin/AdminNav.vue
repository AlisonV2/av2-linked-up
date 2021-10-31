<template>
  <header class="header admin-navbar">
    <div class="container-fluid">
      <nav class="navbar-container">
        <ul class="navbar-menu" :class="{ active: isActive }">
          <li class="nav-link">
            <a class="logout-link"
              ><span class="d-none d-sm-inline mx-3" @click.prevent="logout"
                >Logout</span
              >
              <i class=" fs-3 bi bi-box-arrow-right"></i
            ></a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
/**
 * @exports AdminNavbar
 * @type {Component}
 * @vue-data {boolean} isActive
 * @vue-event logout
 */
export default {
  name: 'Navbar',
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    /**
     * @description Dispatch logout store action
     * Redirect to Home page if the current route requires authentication
     * @method logout
     */
    logout() {
      this.$store.dispatch('logout');
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'Home' });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.admin-navbar {
  background-color: $dark;
  height: 3.5rem;
  .navbar-container {
    display: flex;
    justify-content: flex-end;
  }
  .nav-item {
    color: $light;
  }
  span {
    color: $light;
  }
  .logout-link {
    display: flex;
    align-items: center;
  }
}
</style>
