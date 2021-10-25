<template>
  <div class="container">
    <div class="row">
      <app-title>Find your artist</app-title>
    </div>
      <ArtistList />
  </div>
</template>

<script>
import ArtistList from '@/components/artists/ArtistList';

export default {
  name: 'Artists',
  components: {
    ArtistList,
  },
};
</script>
