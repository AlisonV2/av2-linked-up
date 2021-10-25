<template>
  <button class="btn" :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['mode'],
};
</script>

<style lang="scss">
.btn {
    background-color: white;
    padding: .75rem 1.5rem;
    border-radius: 0;
    border: 1px solid $primary;
    color: $primary;
    font-family: $accent-font;
    // box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    transition: 0.5s;
    &:hover {
        color: white;
        box-shadow: inset 18em 0 0 0 $primary;
    }
}
</style>
