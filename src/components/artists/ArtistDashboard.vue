<template>
  <div class="row">
    <app-title mode="title-img">Your profile</app-title>
    <div class="toast-success" v-if="showSuccessToast">Update successful</div>
    <div class="toast-error" v-if="showErrorToast">
      Oops... Something went wrong :(
    </div>
    <div class="col-12 col-lg-4 mt-4">
      <div class="mt-3">
        <input
          type="file"
          data-test="file-upload"
          @change="setPreviewImage($event)"
        />
        <div class="error">{{ fileErr }}</div>
      </div>
      <img
        :src="
          previewImage
            ? previewImage
            : require('@/assets/img/default-placeholder.png')
        "
        width="250"
        height="250"
        class="img-fluid"
      />
      <div class="btn-center mt-3 thumbnail-button" @click="setArtistThumbnail">
        <app-button mode="save-btn">Save</app-button>
      </div>
      <!-- <div class="error">{{ fileError }}</div> -->
    </div>
    <form class="col-12 col-lg-8 mt-4" @submit.prevent="setArtistProfile">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Public Name"
          v-model="profile.name"
        />
        <label>Public Name</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="textarea"
          class="form-control"
          placeholder="Description "
          v-model="profile.description"
        />
        <label>Description</label>
      </div>
      <div class="input-group">
        <div class="form-floating mb-3 col-lg-6">
          <input
            type="text"
            class="form-control"
            placeholder="City"
            v-model="profile.city"
          />
          <label>City</label>
        </div>
        <div class="form-floating mb-3 col-lg-6">
          <input
            type="text"
            class="form-control"
            placeholder="Zip Code"
            v-model="profile.zip"
          />
          <label>Zip Code</label>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Shop"
          v-model="profile.shop"
        />
        <label>Shop</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Social Media Link"
          v-model="profile.socialLink"
        />
        <label>Social Media Link</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Instagram Name"
          v-model="profile.insta"
        />
        <label>Instagram Name</label>
      </div>
      <div>
        <select class="form-select" v-model="profile.style">
          <option disabled value="">Choose your style</option>
          <option value="Black Work">Black Work</option>
          <option value="New School">New School</option>
          <option value="Old School">Old School</option>
          <option value="Surrealism">Surrealism</option>
        </select>
      </div>
      <div class="col-12 btn-right mt-3">
        <div class="btn-group mb-3">
          <app-button>Save</app-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports ArtistDashboard
 * @type {Component}
 * @requires Sentry
 * @vue-data {array} previewImage
 * @vue-data {object} profile
 * @vue-data {boolean} showSuccessToast
 * @vue-data {boolean} showErrorToast
 * @vue-data {array} fileSelected
 * @vue-data {string} fileErr
 * @vue-event {object} getArtistProfile
 * @vue-event {string} setPreviewImage
 * @vue-event {string} setArtistProfile
 * @vue-event {string} setArtistThumbnail
 */
export default {
  name: 'ArtistDashboard',
  data() {
    return {
      previewImage: null,
      profile: {
        name: '',
        city: '',
        zip: '',
        shop: '',
        style: '',
        socialLink: '',
        insta: '',
        description: '',
        thumbnail: '',
      },
      showSuccessToast: false,
      showErrorToast: false,
      fileSelected: null,
      fileErr: null,
    };
  },
  async created() {
    await this.$store
      .dispatch('getArtistProfile')
      .then(() => {
        this.profile = this.$store.state.artistProfile.artistProfile;
      })
      .then(() => {
        this.previewImage = this.profile.thumbnail;
      })
      .catch((err) => Sentry.captureException(err));
  },
  methods: {
    setPreviewImage($event) {
      const file = $event.target.files[0];
      const types = ['image/png', 'image/jpeg'];

      if (file && types.includes(file.type)) {
        this.fileSelected = file;
        this.fileErr = null;
        this.previewImage = URL.createObjectURL(file);
      } else {
        this.fileSelected = null;
        this.fileErr = 'Please select an image file (png or jpeg).';
      }
    },
    setArtistThumbnail() {
      this.$store
        .dispatch('setArtistThumbnail', this.fileSelected)
        .then(() => {
          this.showSuccess();
          window.location.reload();
        })
        .catch((err) => {
          this.showError(err);
        });
    },
    async setArtistProfile() {
      const profileData = {
        name: this.profile.name,
        city: this.profile.city,
        zip: this.profile.zip,
        shop: this.profile.shop,
        style: this.profile.style,
        socialLink: this.profile.socialLink,
        insta: this.profile.insta,
        description: this.profile.description,
      };
      await this.$store
        .dispatch('setArtistProfile', profileData)
        .then(() => {
          this.showSuccess();
          window.location.reload();
        })
        .catch((err) => {
          this.showError(err);
        });
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
  form {
    max-width: 90%;
  }
}
</style>
