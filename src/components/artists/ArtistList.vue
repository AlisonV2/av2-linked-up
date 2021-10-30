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

export default {
  name: 'ArtistList',
  components: {
    ArtistItem,
  },
  data() {
    return {
      artists: []
    };
  },
  async created() {
    await this.$store.dispatch('getAllArtists').then(() => {
      this.artists = this.$store.getters.getAllArtists;
    })
  }
};
</script>
