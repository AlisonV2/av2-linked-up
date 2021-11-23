<template>
  <header class="header">
    <div class="container-fluid">
      <nav class="navbar-container">
        <router-link :to="{ name: 'Home' }" class="navbar-logo">
          <NavBrand />
        </router-link>
        <ul
          class="navbar-menu"
          :class="{ active: isActive }"
          @click="isActive = false"
        >
          <li class="navbar-item">
            <router-link :to="{ name: 'Artists' }" id="artists-link">
              Artists
            </router-link>
          </li>
          <li class="navbar-item">
            <router-link :to="{ name: 'Conventions' }" id="conventions-link">
              Conventions
            </router-link>
          </li>
          <li class="navbar-item" v-if="!userLoggedIn">
            <router-link :to="{ name: 'Login' }" id="login-link">
              Login
            </router-link>
          </li>
          <template v-else>
            <li class="navbar-item">
              <router-link :to="{ name: 'AdminProfile' }" id="dashboard-link">
                Dashboard
              </router-link>
            </li>
            <li class="navbar-item">
              <a @click.prevent="logout" id="logout-link"> Logout </a>
            </li>
          </template>
        </ul>
        <div
          class="hamburger"
          @click="isActive = !isActive"
          :class="{ active: isActive }"
          id="hamburger-menu"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import NavBrand from '@/components/nav/Brand';
import { mapState } from 'vuex';

/**
 * @exports AppNavbar
 * @requires Brand
 * @requires mapState - From vuex
 * @type {Component}
 * @vue-computed {boolean} userLoggedIn - Access userLoggedIn state from store
 * @vue-data {boolean} isActive - Toggles hamburger menu
 * @vue-event logout - Dispatch logout store action
 */
export default {
  name: 'AppNavbar',
  components: {
    NavBrand,
  },
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
  },
  data() {
    return {
      isActive: false,
    };
  },
  /**
   * @description Dispatch logout store action
   * Redirect to Home page if the current route requires authentication
   * @method logout
   */
  methods: {
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
.header {
  padding-right: 1rem;
  padding-left: 1rem;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
}

.hamburger {
  display: none;
}

.bar {
  display: block;
  width: 2rem;
  height: 3px;
  margin: 0.5rem auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: $light;
}

.navbar-menu {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0;
  align-items: center;
}

.navbar-item {
  margin-left: 2.5rem;
  list-style: none;
  a,
  #logout-link {
    color: $light;
    text-decoration: none;
    font-family: $accent-font;
    font-size: 1.2rem;
  }
  a:hover,
  .router-link-active,
  .router-link-exact-active {
    color: $primary;
  }
}

@include bp-down(xxl) {
  .navbar-menu {
    position: fixed;
    right: -100%;
    top: 6rem;
    flex-direction: column;
    background-color: $light;
    width: 100%;
    height: 70%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    z-index: 1000;
  }
  .navbar-menu.active {
    right: 0;
  }
  .navbar-item {
    margin: 1.5rem 0;
    a { 
      color: $dark;
    }
  }
  .hamburger {
    display: block;
    cursor: pointer;
    margin-top: 3rem;
    margin-right: 0.5rem;
  }
  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active .bar:nth-child(1) {
    transform: translateY(10px) rotate(45deg);
  }
  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-16px) rotate(-45deg);
  }
}
</style>
