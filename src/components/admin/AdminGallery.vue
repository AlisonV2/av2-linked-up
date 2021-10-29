<template>
  <div class="row">
    <div class="col-12 mb-4">
      <app-title mode="title-img">Your gallery</app-title>
    </div>
    <div class="col-12 btn-right mt-3">
      <div class="btn-group mb-3" @click="setArtistGallery">
        <app-button>Save</app-button>
      </div>
    </div>
    <div class="col-12 mb-4">
      <input
        type="file"
        accept="image/*"
        @change="handleChange($event)"
        multiple="true"
      />
    </div>
  </div>
  <div class="row mb-3" v-if="images.length">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-3"
      v-for="image in images"
      :key="image"
    >
      <GalleryItem :image="image" />
    </div>
  </div>
  <div class="row" v-if="profileGallery.length">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-3"
      v-for="gallery in profileGallery"
      :key="gallery"
    >
      <GalleryItem :gallery="gallery" />
    </div>
  </div>
  <div class="row" v-else>
    <div class="col-12 col-md-6 col-lg-4 col-xl-3">
      <img :src="require('@/assets/img/default-placeholder.png')" />
    </div>
  </div>
</template>

<script>
import GalleryItem from '@/components/admin/GalleryItem';

export default {
  name: 'AdminGallery',
  components: {
    GalleryItem,
  },
  data() {
    return {
      images: [],
      gallery: [],
      profileGallery: [],
    };
  },
  async created() {
    await this.$store
      .dispatch('getArtistProfile')
      .then(() => {
        this.profile = this.$store.state.profile.artistProfile;
      })
      .then(() => {
        this.profileGallery = this.profile.gallery;
      });
  },
  methods: {
    handleChange($event) {
      this.cleanCache();
      const files = $event.target.files;
      this.gallery = files;
      const previews = [];
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const pictureUrl = URL.createObjectURL(files.item(i));
          previews.push(pictureUrl);
        }
        this.images = previews;
      }
    },
    cleanCache() {
      const previews = this.images;
      for (const i in previews) {
        if (previews[i].startsWith('blob:')) {
          URL.revokeObjectURL(previews[i]);
        }
      }
    },
    saveGallery() {
      for (let i = 0; i < this.gallery.length; i++) {
        this.$store.dispatch('setArtistGallery', this.gallery[i]);
      }
    },
    async setArtistGallery() {
      this.saveGallery();
      const gallery = this.$store.state.profile.artistGallery;
      const globalGallery = [];
      for (let i = 0; i < gallery.length; i++) {
        globalGallery.push(gallery[i]);
      }
      for (let i = 0; i < this.profileGallery.length; i++) {
        globalGallery.push(this.profileGallery[i]);
        console.log(globalGallery)
      }
      this.profileGaller = globalGallery;
      this.$store.dispatch('addGallery', globalGallery);
    },
  },
};
</script>

<style lang="scss"></style>
