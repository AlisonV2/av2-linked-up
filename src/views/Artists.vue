<template>
  <div class="container">
    <div class="row">
      <app-title mode="title-img">Find your artist</app-title>
    </div>
      <ArtistList />
  </div>
</template>

<script>
import ArtistList from '@/components/artists/ArtistList';
/**
 * @type Page
 * @name Artists
 */
export default {
  name: 'Artists',
  components: {
    ArtistList,
  },
};
</script>
