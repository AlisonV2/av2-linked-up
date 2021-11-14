<template>
  <img src="/img/logo-light.png" class="navbar-brand desktop-logo"/>
  <img src="/img/logo.png" class="navbar-brand mobile-logo"/>
  <h1 class="tablet-logo">Linked Up</h1>
</template>

<script>
/**
 * Wrapper component for the logo
 * @exports NavBrand
 * @type {Component}
 */
export default {
    name: 'NavBrand'
}
</script>

<style lang="scss">
.navbar-brand {
    height: 10rem;
}

.desktop-logo, .tablet-logo {
    display: none;
}

@include bp-up(lg) {
  .mobile-logo, .tablet-logo {
    display: none;
  }
  .desktop-logo {
    display: flex;
  }
}

@media (min-width: 750px) and (max-width: 1136px) {
  .mobile-logo, .desktop-logo {
    display: none;
  }
  .tablet-logo {
    display: flex;
    font-family: $accent-font;
    font-size: 2.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
</style>