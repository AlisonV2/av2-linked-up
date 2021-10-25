<template>
  <div class="container">
    <div class="row">
      <app-title mode="profile-title-img">{{ artist.alias }}</app-title>
    </div>
    <div class="row">
      <div class="col-12 col-lg-5 img-center">
        <a target="blank" :href="artist.socialLink"
          ><img class="img-fluid" :src="`/img/${artist.id}-profile.jpg`"
        /></a>
      </div>
      <div class="col-12 col-lg-7 text-center">
        <p class="accent-text">About</p>
        <p>{{ artist.about }}</p>
        <p>
          <span class="accent-text">Shop:</span> {{ artist.shop }} -
          {{ artist.location }}
        </p>
        <div class="row">
          <div class="col-6">
            <p class="accent-text">
              Insta:
              <a target="blank" :href="artist.socialLink">
                {{ artist.insta }}</a
              >
            </p>
          </div>
          <div class="col-6">
            <p><span class="accent-text">Style:</span> {{ artist.style }}</p>
          </div>
        </div>
        <div class="mt-4 btn-center">
          <app-button>Contact {{ artist.alias }}</app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import artists from '@/data/artists';

export default {
  name: 'ArtistProfile',
  data() {
    return {
      artists,
    };
  },
  computed: {
    artist() {
      return this.artists.find((artist) => artist.id === this.$route.params.id);
    },
  },
};
</script>

<style lang="scss">
.img-fluid {
  max-height: 20rem;
}
</style>
