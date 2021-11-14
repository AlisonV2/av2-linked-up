<template>
  <div class="modal" :style="{ display: show ? 'block' : 'none' }">
    <div class="modal-dialog" style="z-index: 2000">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><slot name="title" /></h5>
          <span class="close-btn" @click="close">&times;</span>
        </div>
        <div class="modal-body">
          <p><slot name="content" /></p>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show" @click="close"></div>
  </div>
</template>

<script>
/**
 * @exports AppModal
 * @type {Component}
 * @vue-prop {boolean} show - Toggles modal visibility
 * @vue-prop {boolean} scrollable - Decides if modal is scrollable
 * @vue-event {boolean} close - Emits hide event
 * @vue-event {boolean} onClickAway - Emits hide event
 */
export default {
  name: 'AppModal',
  props: {
    show: {
      required: true,
    },
    scrollable: {
      default: false,
    },
  },
  watch: {
    show: {
      immediate: true,
      handler(newVal) {
        if (newVal && !this.scrollable) {
          document.body.style.setProperty('overflow', 'hidden');
        } else {
          document.body.style.removeProperty('overflow');
        }
      },
    },
  },
  methods: {
    close() {
      this.$emit('hide');
    },
    handler(e) {
      if (e.code === 'Escape' && this.show) {
        this.close();
      }
    },
    onClickAway() {
      this.$emit('hide');
    },
  },
  created() {
    document.addEventListener('keydown', this.handler);
  },
  unmounted() {
    document.removeEventListener('keydown', this.handler);
  },
};
</script>

<style lang="scss">
.close-btn {
  background-color: transparent;
  color: white !important;
  border: 1px solid white !important;
  padding: 0rem 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: $primary !important;
    color: $light !important;
    border: 1px solid $primary!important;
  }
}

.modal-content {
  background: rgba(255, 255, 255, 0.51);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  backdrop-filter: blur(9.1px);
  -webkit-backdrop-filter: blur(9.1px);
  border: 1px solid rgba(255, 255, 255, 0.35);
}
.modal-dialog {
  margin-top: 10%;
}

.modal-body p {
  display: flex;
  justify-content: center;
}
</style>
