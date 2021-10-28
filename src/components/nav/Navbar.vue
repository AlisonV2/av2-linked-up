<template>
  <header class="header">
    <div class="container-fluid">
      <nav class="navbar-container">
        <router-link :to="{ name: 'Home' }" class="navbar-logo">
          <Brand />
        </router-link>
        <ul class="navbar-menu" :class="{ active: isActive }">
          <li class="navbar-item">
            <router-link :to="{ name: 'Artists' }">
              Artists
            </router-link>
          </li>
          <li class="navbar-item">
            <router-link :to="{ name: 'Conventions' }">
              Conventions
            </router-link>
          </li>
          <li class="navbar-item">
            <router-link :to="{ name: 'Login' }">
              Login
            </router-link>
          </li>
        </ul>
        <div
          class="hamburger"
          @click="isActive = !isActive"
          :class="{ active: isActive }"
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
import Brand from '@/components/nav/Brand';

export default {
  name: 'AppNavbar',
  components: {
    Brand,
  },
  data() {
    return {
      isActive: false,
    };
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
  width: 1.25rem;
  height: 3px;
  margin: 0.25rem auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: $dark;
}

.navbar-menu {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
  align-items: center;
}

.navbar-item {
  margin-left: 2.5rem;
  list-style: none;
  a {
    color: $dark;
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

@include bp-down(md) {
  .navbar-menu {
    position: fixed;
    right: -100%;
    top: 5rem;
    flex-direction: column;
    background-color: white;
    width: 100%;
    border-radius: 0.5rem;
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
  }
  .hamburger {
    display: block;
    cursor: pointer;
    margin-top: 1rem;
    margin-right: 0.5rem;
  }
  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}
</style>
