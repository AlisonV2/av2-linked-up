<template>
  <form class="col-12 col-md-6 geoloc" @submit.prevent="handleSubmit">
    <app-title>Looking for an artist? </app-title>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your city"
        id="autocomplete"
        v-model="location"
        autocomplete
      />
      <span class="input-group-text" @click="getGeoloc"
        ><i class="fs-4 bi bi-geo-alt-fill"></i></span
      >
    </div>
    <div class="btn-center">
      <app-button>Search</app-button>
    </div>
    <router-link :to="{name: 'Categories'}"><app-title>Or search by styles <i class="bi bi-arrow-right"></i></app-title></router-link>
  </form>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports HomeGeoloc
 * @type {Component}
 * @requires Sentry
 * @vue-data {string} location - v-model
 * @vue-data {string} city - stores user's city from geoloc
 * @vue-data {string} address - stores user's address from geoloc
 * @vue-event {object} getGeoloc - dispatch getGeoloc action
 * @vue-event {string} searchByGeoloc - dispatch store action
 * @vue-event handleSubmit - dispatches store action and redirects to results page
 */
export default {
  data() {
    return {
      location: '',
      city: '',
      address: '',
      geoloc: false,
      loc: '',
    };
  },
  methods: {
    getGeoloc() {
      this.$store.dispatch('getGeoloc')
      .then(() => {
        const data = this.$store.getters.getGeoloc;
        this.location = data.location;
        this.loc = data.loc;
      })
      .then(() => {
        this.geoloc = true;
      })
      .catch((err) => Sentry.captureException(err));
    },
    /**
     * @description Dispatch store action
     * @method searchByGeoloc
     * @param {string} loc
     * @async
     */
    async searchByGeoloc() {
      await this.$store.dispatch('getArtistsByCity', this.loc);
    },
    /**
     * @description Dispatch store action
     * @method searchByCity
     * @async
     */
    async searchByCity() {
      this.geoloc = false;
      let code;
      const city = this.location.toLowerCase();
      await fetch(
        `https://geo.api.gouv.fr/communes?nom=${city}&fields=departement&limit=1`
      )
        .then((res) => res.json())
        .then((data) => (code = data[0].departement.code))
        .catch((err) => Sentry.captureException(err));
      await this.$store.dispatch('getArtistsByCity', code);
    },
    /**
     * @description Checks if input value is from geoloc or manual input
     * @method handleSubmit
     * @param {boolean} geoloc
     * @async
     */
    handleSubmit() {
      if (this.geoloc) {
        this.searchByGeoloc()
          .then(() => this.$router.push({ name: 'GeoResults' }))
          .catch((err) => Sentry.captureException(err));
      } else {
        this.searchByCity()
          .then(() => this.$router.push({ name: 'GeoResults' }))
          .catch((err) => Sentry.captureException(err));
      }
    },
  },
};
</script>

<style lang="scss">
@include bp-up(md) {
  .geoloc {
    max-width: 80% !important;
  }
}
.geoloc-row {
  margin-bottom: 3rem;
}

.bi-geo-alt-fill {
  font-size: 1.5rem !important;
  cursor: pointer;
}
</style>
