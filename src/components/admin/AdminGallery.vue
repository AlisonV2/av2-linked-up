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
      <PreviewItem :image="image" @removePreview="removePreview"/>
    </div>
  </div>
  <div class="row">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-3"
      v-for="(gallery, i) in profileGallery"
      :key="gallery"
    >
      <GalleryItem :image="gallery" :index="i" @removeImg="removeImg"/>
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

export default {
  name: 'AdminGallery',
  components: {
    GalleryItem,
    PreviewItem
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
      .dispatch('getArtistGallery')
      .then(() => {
        const gallery = this.$store.state.gallery.gallery;
        this.profileGallery = gallery.gallery;
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
      if (this.profileGallery.length) {
        this.$store.dispatch('updateArtistGallery', this.gallery);
        return;
      }
      this.$store.dispatch('setArtistGallery', this.gallery);
    },
    removeImg(i) {
      this.profileGallery.splice(i, 1);
      this.$store.dispatch('deleteImage', this.profileGallery);
    },
    removePreview(i) {
      this.images.splice(i, 1);
    }
  },
};
</script>
