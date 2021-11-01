<template>
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
</template>

<script>
import ArtistItem from '@/components/artists/ArtistItem';
import * as Sentry from '@sentry/vue';

/**
 * @exports ArtistList
 * @type {Component}
 * @vue-data {array} artists
 * @vue-event created - Dispatch store action
 */
export default {
  name: 'ArtistList',
  components: {
    ArtistItem,
  },
  data() {
    return {
      artists: [],
    };
  },
  /**
   * @description Dispatch getAllArtists action on created hook
   * Get results from store
   * @method created
   * @returns {array}
   * @async
   */
  async created() {
    await this.$store.dispatch('getAllArtists')
    .then(() => {
      this.artists = this.$store.getters.getAllArtists;
    })
    .catch((err) => Sentry.captureException(err));
  },
};
</script>
