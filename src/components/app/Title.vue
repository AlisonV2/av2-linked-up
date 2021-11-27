<template>
  <div class="col-12 text-center mb-4 app-title">
    <h2 class="main-title">
      <slot />
    </h2>
  </div>
</template>

<script>
/**
 * @exports AppTitle
 * @type {GlobalComponent}
 */
export default {
};
</script>

<style lang="scss">
@include bp-up(md) {
  .app-title {
    margin-top: 1rem;
  }
}

.app-title {
  margin-top: 2rem;
}
</style>
