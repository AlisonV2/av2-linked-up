<template>
  <div class="row artists-list">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-3"
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
  created() {
    this.$store
      .dispatch('getAllArtists')
      .then(() => {
        this.artists = this.$store.getters.getAllArtists;
      })
      .catch((err) => Sentry.captureException(err));
  },
};
</script>

<style lang="scss">
@include bp-down(md) {
  .artists-list {
    padding-right: 1rem;
    padding-left: 1rem;
  }
}
</style>
