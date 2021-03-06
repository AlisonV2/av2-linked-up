<template>
  <div class="row">
    <app-title>Your profile</app-title>
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
        alt="Profile Image"
      />
      <div class="btn-center mt-3 thumbnail-button" @click="setOrgaThumbnail">
        <app-button mode="save-btn">Save</app-button>
      </div>
      <div class="error">{{ fileErr }}</div>
    </div>
    <form class="col-12 col-lg-8 mt-4" @submit.prevent="setOrgaProfile">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Public Name"
          v-model="profile.name"
        />
        <label>Public Name</label>
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
      <div class="col-12 btn-right mt-3">
        <div class="btn-group mb-3">
          <app-button>Save</app-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import toasts from '@/mixins/toasts';

/**
 * @exports OrgaDashboard
 * @type {Component}
 * @vue-data {array} previewImage
 * @vue-data {object} profile
 * @vue-data {boolean} showSuccessToast
 * @vue-data {boolean} showErrorToast
 * @vue-data {array} fileSelected
 * @vue-data {string} fileErr
 * @vue-event {object} getOrgaProfile
 * @vue-event {string} setPreviewImage
 * @vue-event {string} setOrgaProfile
 * @vue-event {string} setOrgaThumbnail
 */
export default {
  name: 'OrgaDashboard',
  mixins: [toasts],
  data() {
    return {
      previewImage: null,
      profile: {
        name: '',
        city: '',
        zip: '',
        thumbnail: '',
      },
      fileSelected: null,
      fileErr: null,
    };
  },
  async created() {
    await this.$store
      .dispatch('getOrgaProfile')
      .then(() => {
        this.profile = this.$store.getters.getOrgaProfile;
      })
      .then(() => {
        this.previewImage = this.profile.thumbnail;
      });
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
    setOrgaThumbnail() {
      this.$store
        .dispatch('setOrgaThumbnail', this.fileSelected)
        .then(() => {
          this.showSuccess();
          window.location.reload();
        })
        .catch((err) => {
          this.showError(err);
        });
    },
    async setOrgaProfile() {
      const profileData = {
        name: this.profile.name,
        city: this.profile.city,
        zip: this.profile.zip,
      };
      await this.$store
        .dispatch('setOrgaProfile', profileData)
        .then(() => {
          this.showSuccess();
          window.location.reload();
        })
        .catch((err) => {
          this.showError(err);
        });
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
