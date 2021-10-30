<template>
  <div class="card artist-card">
    <div class="card-overlay"></div>
    <div class="card-details fade-in-top text-center">
      <h5 class="card-title">{{ artist.name }}</h5>
      <p class="card-text">{{ artist.shop }}</p>
      <p class="card-text">{{ artist.city }} ({{ artist.zip }})</p>
    </div>
    <img
      :src="artist.thumbnail"
      class="card-img-top"
      :alt="artist.name"
    />
    <div class="card-body">
      <h5 class="card-title">{{ artist.name }}</h5>
    </div>
  </div>
</template>

<script>
/**
 * @type Component
 * @name ArtistItem
 * @vue-prop {object} artists
 */
export default {
  name: 'ArtistItem',
  props: ['artist'],
};
</script>

<style lang="scss" scoped>
.artist-card {
  .card-title {
    font-family: $accent-font;
    color: $primary;
    font-size: 1.2rem;
  }
  .card-text {
    color: $light;
  }
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
    .card-title {
      margin-bottom: 2rem;
    }
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

.artist-card:hover {
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

.fade-in-top {top: 20%};
</style>
