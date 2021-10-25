<template>
  <div class="container">
    <div class="row">
      <app-title>{{ artist.alias }}</app-title>
    </div>
    <div class="row">
      <div class="col-12 col-lg-6">
        <a target="blank" :href="artist.socialLink"><img class="img-fluid" :src="`/img/${artist.id}-profile.jpg`" /></a>
      </div>
      <div class="col-12 col-lg-6 text-center">
        <p class="accent-text">About</p>
        <p>{{ artist.about }}</p>
        <p><span class="accent-text">Shop:</span> {{ artist.shop }} - {{ artist.location }}</p>
        <p><span class="accent-text">Style:</span> {{ artist.style }}</p>
        <p class="accent-text">Insta: <a target="blank" :href="artist.socialLink"> {{ artist.insta }}</a></p>
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
          return this.artists.find(artist => artist.id === this.$route.params.id)
      },
  }
};
</script>
