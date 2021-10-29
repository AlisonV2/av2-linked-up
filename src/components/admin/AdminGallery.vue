<template>
  <div class="row">
    <div class="col-12 mb-4">
      <app-title mode="title-img">Your gallery</app-title>
    </div>
    <div class="col-12 btn-right mt-3">
        <div class="btn-group mb-3" @click="saveGallery">
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
  <div class="row" v-if="images.length">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-3"
      v-for="image in images"
      :key="image"
    >
      <GalleryItem :image="image" />
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
    };
  },
  methods: {
    handleChange($event) {
      this.cleanCache();
      const files = $event.target.files;
      const previews = [];
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const pictureUrl = URL.createObjectURL(files.item(i));
          previews.push(pictureUrl);
          console.log(pictureUrl);
        }
        this.images = previews;
        console.log(previews);
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
  },
};
</script>

<style lang="scss"></style>
