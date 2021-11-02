<template>
  <div class="container">
    <div class="row mb-3">
      <app-title mode="profile-title-img">{{ artist.name }}</app-title>
    </div>
    <div class="row">
      <div class="col-12 col-lg-5 img-center">
        <a target="blank" :href="artist.socialLink"
          ><img class="img-fluid" :src="artist.thumbnail"
        /></a>
      </div>
      <div class="col-12 col-lg-7 text-center">
        <p class="accent-text">About</p>
        <p>{{ artist.description }}</p>
        <p>
          <span class="accent-text">Shop:</span> {{ artist.shop }} -
          {{ artist.city }} ({{ artist.zip }})
        </p>
        <div class="row">
          <div class="col-6">
            <p class="accent-text">
              Insta:
              <a target="blank" :href="artist.insta"> {{ artist.insta }}</a>
            </p>
          </div>
          <div class="col-6">
            <p><span class="accent-text">Style:</span> {{ artist.style }}</p>
          </div>
        </div>
        <div class="mt-4 btn-center">
          <app-button>Contact {{ artist.name }}</app-button>
        </div>
      </div>
    </div>
    <div class="row mb-3" v-if="gallery.length">
      <app-title mode="profile-title-img">Gallery</app-title>
    </div>
    <div class="row">
      <div class="col-auto" v-for="img in gallery" :key="img">
        <div class="card gallery-card">
          <img :src="img" class="card-img-top" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @exports ArtistProfile
 * @type {Page}
 * @vue-computed {array} gallery - Returned from store
 * @vue-computed {object} artist - Returned from store
 * @vue-event created - Dispatch store action on created hook
 */
export default {
  name: 'ArtistProfile',
  async created() {
    await this.$store.dispatch('getArtistById', this.$route.params.id);
    await this.$store.dispatch('getGalleryFromId', this.$route.params.id);
  },
  computed: {
    gallery() {
      return this.$store.getters.getGalleryFromId;
    },
    artist() {
      return this.$store.getters.getArtistProfile;
    },
  },
};
</script>

<style lang="scss">
.img-fluid {
  max-height: 20rem;
}
</style>
