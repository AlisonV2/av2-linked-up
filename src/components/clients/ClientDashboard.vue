<template>
  <div class="row">
    <app-title mode="title-img">Your profile</app-title>
    <div class="toast-success" v-if="showSuccessToast">Update successful</div>
    <div class="toast-error" v-if="showErrorToast">
      Oops... Something went wrong :(
    </div>
    <div class="col-12 col-lg-4 mt-4">
      <div class="mt-3">
        <input type="file" @change="setPreviewImage($event)" />
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
      <div class="btn-center mt-3 thumbnail-button" @click="setClientThumbnail">
        <app-button mode="save-btn">Save</app-button>
      </div>
      <!-- <div class="error">{{ fileError }}</div> -->
    </div>
    <form class="col-12 col-lg-8 mt-4" @submit.prevent="setClientProfile">
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
      <div>
        <select class="form-select" v-model="profile.tattooed">
          <option disabled value="">Already tattooed?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
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
 * @exports ClientDashboard
 * @type {Component}
 * @requires Sentry
 * @vue-data {array} previewImage
 * @vue-data {object} profile
 * @vue-data {boolean} showSuccessToast
 * @vue-data {boolean} showErrorToast
 * @vue-data {array} fileSelected
 * @vue-data {string} fileErr
 * @vue-event {object} getClientProfile
 * @vue-event {string} setPreviewImage
 * @vue-event {string} setClientProfile
 * @vue-event {string} setClientThumbnail
 */
export default {
  name: 'ClientDashboard',
  data() {
    return {
      previewImage: null,
      profile: {
        name: '',
        description: '',
        city: '',
        zip: '',
        tattooed: '',
        thumbnail: ''
      },
      showSuccessToast: false,
      showErrorToast: false,
      fileSelected: null,
      fileErr: null,
    };
  },
  async created() {
    await this.$store
      .dispatch('getClientProfile')
      .then(() => {
        this.profile = this.$store.state.clientProfile.clientProfile;
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
    setClientThumbnail() {
      this.$store
        .dispatch('setClientThumbnail', this.fileSelected)
        .then(() => {
          this.showSuccess();
          window.location.reload();
        })
        .catch((err) => {
          this.showError(err);
        });
    },
    async setClientProfile() {
      const profileData = {
        name: this.profile.name,
        description: this.profile.description,
        city: this.profile.city,
        zip: this.profile.zip,
        tattooed: this.profile.tattooed
      };
      await this.$store
        .dispatch('setClientProfile', profileData)
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
