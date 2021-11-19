<template>
  <div class="row">
    <app-title>Create a New Event</app-title>
    <div class="toast-success" v-if="showSuccessToast">Event created!</div>
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
        alt="event Image"
      />
      <div class="btn-center mt-3 thumbnail-button" @click="setOrgaThumbnail">
        <app-button mode="save-btn">Save</app-button>
      </div>
      <div class="error">{{ fileErr }}</div>
    </div>
    <form class="col-12 col-lg-8 mt-4" @submit.prevent="setNewEvent">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Public Name"
          v-model="event.name"
        />
        <label>Public Name</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="textarea"
          class="form-control"
          placeholder="Description "
          v-model="event.description"
        />
        <label>Description</label>
      </div>
      <div class="input-group">
        <div class="form-floating mb-3 col-lg-6">
          <input
            type="text"
            class="form-control"
            placeholder="City"
            v-model="event.city"
          />
          <label>City</label>
        </div>
        <div class="form-floating mb-3 col-lg-6">
          <input
            type="text"
            class="form-control"
            placeholder="Zip Code"
            v-model="event.zip"
          />
          <label>Zip Code</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Date"
            v-model="event.date"
          />
          <label>Date</label>
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
import * as Sentry from '@sentry/vue';

/**
 * @exports OrgaDashboard
 * @type {Component}
 * @requires Sentry
 * @vue-data {array} previewImage
 * @vue-data {object} event
 * @vue-data {boolean} showSuccessToast
 * @vue-data {boolean} showErrorToast
 * @vue-data {array} fileSelected
 * @vue-data {string} fileErr
 * @vue-event {string} setPreviewImage
 * @vue-event {string} setOrgaEvent
 * @vue-event {string} setOrgaThumbnail
 */
export default {
  name: 'OrgaDashboard',
  data() {
    return {
      previewImage: null,
      event: {
        name: '',
        description: '',
        city: '',
        zip: '',
        date: '',
        thumbnail: '',
      },
      showSuccessToast: false,
      showErrorToast: false,
      fileSelected: null,
      fileErr: null,
    };
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
    setEventThumbnail() {
      this.$store
        .dispatch('setEventThumbnail', this.fileSelected)
        .then(() => {
          this.showSuccess();
          window.location.reload();
        })
        .catch((err) => {
          this.showError(err);
        });
    },
    async setNewEvent() {
      const eventData = {
        name: this.event.name,
        description: this.event.description,
        city: this.event.city,
        zip: this.event.zip,
        date: this.event.date,
      };
      await this.$store
        .dispatch('setNewEvent', eventData)
        .then(() => {
          this.showSuccess();
        })
        .then(() => {
            this.$router.push({name: 'AdminEvents'});
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
