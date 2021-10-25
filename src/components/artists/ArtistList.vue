<template>
  <div class="row">
    <div
      class="col-8 col-md-6 col-lg-4 col-xl-3 artists-list"
      v-for="artist in artists"
      :key="artist.alias"
    >
      <router-link :to="{ name: 'Profile', params: { id: artist.id } }">
        <ArtistItem :artist="artist" />
      </router-link>
    </div>
  </div>
</template>

<script>
import ArtistItem from '@/components/artists/ArtistItem';
import artists from '@/data/artists';

export default {
  name: 'ArtistList',
  components: {
    ArtistItem,
  },
  data() {
    return {
      artists
    };
  },
};
</script>
