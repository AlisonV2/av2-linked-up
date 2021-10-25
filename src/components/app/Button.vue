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
    font-family: $accent-font;
    transition: 0.25s;
    &:hover {
        color: white;
        box-shadow: inset 10em 0 0 0 $primary;
    }
}
</style>
