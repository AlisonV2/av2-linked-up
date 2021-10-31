<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h2 class="accent-text mb-4">Sorry, no artist found.</h2>
        <router-link :to="{ name: 'Home'}">Go back</router-link>
      </div>
    </div>
    <div class="row" v-if="artists.length">
      <div
        class="col-8 col-md-6 col-lg-4 col-xl-3 artists-list"
        v-for="artist in artists"
        :key="artist.name"
      >
        <router-link :to="{ name: 'Profile', params: { id: artist.id } }">
          <ArtistItem :artist="artist" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ArtistItem from '@/components/artists/ArtistItem';

/**
 * @exports GeoResults
 * @requires ArtistItem
 * @type {Page}
 * @vue-data {array} [artists=[]] - artists - Artists accessed from store categories module
 * @vue-event created - Access store categories modules and assign it to artists array on created hook
 */
export default {
  name: 'GeoResults',
  components: {
    ArtistItem,
  },
  data() {
    return {
      artists: [],
    };
  },
  created() {
    this.artists = this.$store.state.search.artistsByCity;
    console.log(this.artists)
  },
};
</script>
