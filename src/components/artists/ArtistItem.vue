<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-7">
        <img
          :src="`/img/${artist.id}.jpg`"
          class="img-fluid"
          :alt="artist.alias"
        />
      </div>
      <div class="col-5">
        <div class="card-body text-center">
          <h5 class="card-title">{{ artist.alias }}</h5>
          <p class="card-text">{{ artist.style }}</p>
          <p class="card-text">
            <small class="text-muted">{{ artist.location }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistItem',
  props: ['artist'],
};
</script>

<style lang="scss" scoped>

.card {
  min-width: 100%!important;
}
.card-title {
  font-family: $accent-font;
  color: $primary;
  font-size: 1.2rem;
}

.card-body {
  padding-left: 0;
}

@include bp-up(md) {
  .card-title {
    margin-bottom: 1.5rem;
  }
}
</style>
