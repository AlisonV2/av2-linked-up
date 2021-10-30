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
        ref="inputFile"
      />
    </div>
  </div>
  <div class="row mb-3">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-3"
      v-for="image in images"
      :key="image"
    >
      <PreviewItem :image="image" @removePreview="removePreview" />
    </div>
  </div>
  <div class="row">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-3"
      v-for="(gallery, i) in profileGallery"
      :key="gallery"
    >
      <GalleryItem :image="gallery" :index="i" @removeImg="removeImg" />
    </div>
  </div>
  <div class="row" v-if="!images">
    <div class="col-12 col-md-6 col-lg-4 col-xl-3">
      <img :src="require('@/assets/img/default-placeholder.png')" />
    </div>
  </div>
</template>

<script>
import GalleryItem from '@/components/admin/GalleryItem';
import PreviewItem from '@/components/admin/PreviewItem';

/**
 * @type Component
 * @name AdminGallery
 * @vue-data {array} images - For previews
 * @vue-data {array} gallery - Current gallery in session
 * @vue-data {array} profileGallery - Current gallery in DB
 * @vue-event {array} getArtistGallery
 * @vue-event {array} handleChange
 * @vue-event {void} cleanCache
 * @vue-event {void} setArtistGallery
 * @vue-event {array} removeImg
 * @vue-event {array} removePreview
 */
export default {
  name: 'AdminGallery',
  components: {
    GalleryItem,
    PreviewItem,
  },
  data() {
    return {
      images: [],
      gallery: [],
      profileGallery: [],
    };
  },
  /**
   * @description Dispatch store action
   * Get the resulting state and set it as profileGallery
   * @method getArtistGallery
   * @returns {array} thumbnail
   * @async
   */
  async created() {
    await this.$store.dispatch('getArtistGallery').then(() => {
      const gallery = this.$store.state.gallery.gallery;
      this.profileGallery = gallery.gallery;
    });
  },
  methods: {
    /**
     * @description Call cleanCache
     * Create preview URL for each image selected
     * Set the resulting images to image array
     * @method getArtistGallery
     * @param {object} $event
     * @returns {array} images
     */
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
    /**
     * @description Clean browser's image url cache for each URL created during the session
     * @method getArtistGallery
     * @param {object} $event
     * @returns {void}
     */
    cleanCache() {
      const previews = this.images;
      for (const i in previews) {
        if (previews[i].startsWith('blob:')) {
          URL.revokeObjectURL(previews[i]);
        }
      }
    },
    /**
     * @description Check if gallery already exists
     * If it does, dispatch updateArtistGallery
     * If it doesn't, dispatch setArtistGallery
     * @method setArtistGallery
     * @param {array} gallery
     * @returns {void} images
     * @async
     */
    async setArtistGallery() {
      if (this.profileGallery.length) {
        this.$store.dispatch('updateArtistGallery', this.gallery);
        return;
      }
      this.$store.dispatch('setArtistGallery', this.gallery);
    },
    /**
     * @description Remove item from current gallery array (to avoid window reload)
     * Dispatch deleteImage action
     * @method setArtistGallery
     * @param {array} profileGallery
     * @returns {array} profileGallery
     */
    removeImg(i) {
      this.profileGallery.splice(i, 1);
      this.$store.dispatch('deleteImage', this.profileGallery);
    },
    /**
     * @description Remove item from current image preview array (to avoid window reload)
     * @method setArtistGallery
     * @returns {array} images
     */
    removePreview(i) {
      this.images.splice(i, 1);
    },
  },
};
</script>
