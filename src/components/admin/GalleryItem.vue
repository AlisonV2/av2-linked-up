<template>
  <div class="card gallery-card" @click="deleteImg">
    <div class="card-overlay"></div>
    <div class="card-details fade-in-top text-center">
      <i class="bi bi-trash img-icon" ></i>
    </div>
    <img :src="image" class="card-img-top gallery-img-item"/>
  </div>
</template>

<script>
/**
 * @exports GalleryItem
 * @type {Component}
 * @vue-prop {string} image
 * @vue-prop {number} index
 * @vue-event {number} removeImg - Emits removeImg event and passes index as data
 */
export default {
  name: 'GalleryItem',
  props: ['image', 'index'],
  methods: {
    deleteImg() {
      this.$emit('removeImg', this.index);
    }
  }
};
</script>

<style lang="scss">
.gallery-card {
  .card-details {
    position: absolute;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    width: 100%;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-in-out 0s;
  }
  .img-icon {
    color: $primary;
    font-size: 2rem;
  }
  .card-overlay {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    transition: all 0.4s ease-in-out 0s;
  }
}

.gallery-card:hover {
  .card-details {
    display: block;
  }
  .card-overlay {
    opacity: 1;
  }
  .card-details {
    top: 50%;
    left: 50%;
    opacity: 1;
  }
}

.fade-in-top {
  top: 20%;
}
</style>
