<template>
  <button class="btn" :class="mode">
    <slot></slot>
  </button>
</template>

<script>
/**
 * @exports AppButton
 * @type {GlobalComponent}
 * @vue-prop {string} mode
 */
export default {
  props: ['mode'],
};
</script>

<style lang="scss">
.btn {
  background-color: $dark;
  padding: 0.75rem 1.5rem;
  border-radius: 0;
  color: $primary;
  font-size: 1.2rem;
  font-family: $accent-font;
  transition: 0.5s;
  &:hover {
    color: $light;
    box-shadow: inset 18em 0 0 0 $primary;
    border: 1px solid $primary;
  }
}
</style>
