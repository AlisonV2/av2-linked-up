<template>
  <img src="/img/logo.png" class="navbar-brand" alt="Brand Logo" />
</template>

<script>
/**
 * Wrapper component for the logo
 * @exports NavBrand
 * @type {Component}
 */
export default {
  name: 'NavBrand',
};
</script>

<style lang="scss">
.navbar-brand {
  height: 7rem;
}

@include bp-up(md) {
  .navbar-brand {
    height: 10rem;
  }
}
</style>
