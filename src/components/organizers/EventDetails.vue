<template>
  <div class="row">
    <app-title>Your event</app-title>
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
        alt="event Image"
      />
      <div
        class="btn-center mt-3 thumbnail-button"
        @click="setEventThumbnail"
      >
        <app-button mode="save-btn">Save</app-button>
      </div>
      <div class="error">{{ fileErr }}</div>
    </div>
    <form class="col-12 col-lg-8 mt-4" @submit.prevent="updateOrgaEvent">
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
      </div>
      <div class="col-12 btn-right mt-3">
        <div class="btn-group mb-3">
          <app-button>Update</app-button>
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
 * @vue-event {object} getOrgaEvent
 * @vue-event {string} setPreviewImage
 * @vue-event {string} updateOrgaEvent
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
        date: '',
        city: '',
        zip: '',
        thumbnail: '',
      },
      showSuccessToast: false,
      showErrorToast: false,
      fileSelected: null,
      fileErr: null,
    };
  },
  created() {
    this.$store
      .dispatch('getEventById', this.$route.params.id)
      .then(() => {
        this.event = this.$store.getters.getEventById;
        console.log(this.event)
      })
      .then(() => {
        this.previewImage = this.event.thumbnail;
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
    setEventThumbnail() {
      this.$store
        .dispatch('setEventThumbnail', {
          file: this.fileSelected,
          eventId: this.$route.params.id
        })
        .then(() => {
          this.showSuccess();
          window.location.reload();
        })
        .catch((err) => {
          this.showError(err);
        });
    },
    updateOrgaEvent() {
      const eventData = {
        id: this.$route.params.id,
        name: this.event.name,
        description: this.event.description,
        city: this.event.city,
        zip: this.event.zip,
        date: this.event.date,
      };
      this.$store
        .dispatch('updateOrgaEvent', eventData)
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
