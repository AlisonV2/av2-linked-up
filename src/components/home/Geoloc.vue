<template>
  <div class="row geoloc-row">
    <form class="col-12 geoloc" @submit.prevent="handleSubmit">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your city"
          id="autocomplete"
          v-model="location"
          autocomplete
        />
        <span class="input-group-text material-icons" @click="getGeoloc"
          >place</span
        >
      </div>
      <div class="btn-center">
        <app-button>Search</app-button>
      </div>
    </form>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports HomeGeoloc
 * @type {Component}
 * @requires Sentry
 * @vue-data {object} coords - Stores current location
 * @vue-data {string} location - v-model
 * @vue-data {string} city - stores user's city from geoloc
 * @vue-data {string} address - stores user's address from geoloc
 * @vue-event {object} getGeoloc - get current location
 * @vue-event {string} setGeoloc - sets current location as input value
 * @vue-event {string} searchByGeoloc - dispatch store action
 * @vue-event {string} setGeoloc - sets current location as input value
 * @vue-event handleSubmit - dispatches store action and redirects to results page
 */
export default {
  data() {
    return {
      coords: {
        lat: '',
        lng: '',
      },
      location: '',
      city: '',
      address: '',
      geoloc: false,
      loc: '',
    };
  },
  methods: {
    /**
     * @description Dispatch getArtistsByStyle action
     * Redirect to CategoriesResults Page
     * @method getGeoloc
     * @returns {object}
     */
    getGeoloc() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.setGeoloc(this.coords);
        console.log('geoloc called')
      });
    },
    /**
     * @description Set current location as input value
     * @method setGeoloc
     * @param {object} coords
     * @returns {string}
     * @async
     */
    async setGeoloc(coords) {
      let response;
      await fetch(process.env.VUE_APP_MAPQUEST_API + coords.lat + ',' + coords.lng)
        .then((res) => res.json())
        .then((data) => (response = data))
        .catch((err) => Sentry.captureException(err));

      const res = response.results[0].locations[0];
      this.location = res.adminArea5;
      const zip = res.postalCode;
      this.loc = zip.substring(0, 2);
      this.geoloc = true;
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
    margin: 0 auto;
  }
}
.geoloc-row {
  margin-bottom: 3rem;
}

.material-icons {
  font-size: 1.5rem !important;
  cursor: pointer;
}
</style>
