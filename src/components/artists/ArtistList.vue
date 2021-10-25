<template>
  <div class="row">
    <div
      class="col-12 col-lg-6 col-xl-4 artists-list"
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
