<template>
  <div class="container">
  <div class="row">
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
 * @exports MapsResults
 * @requires ArtistItem
 * @type {Page}
 * @vue-data {array} [artists=[]] - artists - Artists accessed from store categories module
 * @vue-event created - Access store categories modules and assign it to artists array on created hook
 */
export default {
  name: 'CategoriesResults',
  components: {
    ArtistItem,
  },
  data() {
    return {
      artists: []
    };
  },
};
</script>
