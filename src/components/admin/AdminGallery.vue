<template>
  <div class="row">
    <div class="col-12 mb-4">
      <app-title>Your gallery</app-title>
      <div class="toast-success" v-if="showSuccessToast">Update successful</div>
      <div class="toast-error" v-if="showErrorToast">
        Oops... Something went wrong :(
      </div>
    </div>
    <div class="col-12 btn-right mt-3" v-if="profileGallery">
      <div class="btn-group mb-3" data-test="update" @click="updateArtistGallery">
        <app-button>Update</app-button>
      </div>
    </div>
    <div class="col-12 btn-right mt-3" v-else>
      <div class="btn-group mb-3" data-test="set" @click="setArtistGallery">
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
      class="col-12 col-md-6 col-lg-3 col-xl-2"
      v-for="(gallery, i) in profileGallery"
      :key="gallery"
    >
      <GalleryItem :image="gallery" :index="i" @removeImg="removeImg" />
    </div>
  </div>
  <div class="row" v-if="!profileGallery">
    <div class="col-12 col-md-6 col-lg-4 col-xl-3">
      <img :src="require('@/assets/img/default-placeholder.png')" />
    </div>
  </div>
</template>

<script>
import GalleryItem from '@/components/admin/GalleryItem';
import PreviewItem from '@/components/admin/PreviewItem';
import * as Sentry from '@sentry/vue';

/**
 * @exports AdminGallery
 * @type {Component}
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
      showSuccessToast: false,
      showErrorToast: false,
    };
  },
  created() {
    this.$store.dispatch('getArtistGallery')
    .then(() => {
      this.profileGallery = this.$store.getters.getProfileGallery;
    })
    .catch((err) => {
      Sentry.captureException(err);
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
    async setArtistGallery() {
      await this.$store.dispatch('setArtistGallery', this.gallery);
      this.showSuccess();
      window.location.reload();
    },
    async updateArtistGallery() {
      await this.$store.dispatch('updateArtistGallery', this.gallery);
      this.showSuccess();
      window.location.reload();
    },
    removeImg(i) {
      this.profileGallery.splice(i, 1);
      this.$store.dispatch('deleteImage', this.profileGallery);
    },
    removePreview(i) {
      this.images.splice(i, 1);
    },
    showSuccess() {
      this.showSuccessToast = true;
      this.showErrorToast = false;
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 3000);
    },
    showError(err) {
      this.showErrorToast = true;
      this.showSuccessToast = false;
      Sentry.captureException(err);
      setTimeout(() => {
        this.showErrorToast = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
@include bp-down(md) {
  .row {
    max-width: 90%;
  }
}
</style>