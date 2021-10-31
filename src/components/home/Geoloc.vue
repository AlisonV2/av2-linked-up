<template>
  <div class="row geoloc-row">
    <form class="col-12 geoloc">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your location"
          id="autocomplete"
          v-model="location"
          @change="getPlace"
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
export default {
  data() {
    return {
      coords: {
        lat: '',
        lng: '',
      },
      location: ''
    };
  },
  methods: {
    getGeoloc() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
      }
        this.setGeoloc(this.coords);
      });
    },
    async setGeoloc(coords) {
      let response;
      await fetch(process.env.VUE_APP_MAPQUEST_API + coords.lat + ',' + coords.lng)
      .then((res) => res.json())
      .then((data) => response = data)
      .catch((err) => console.log(err.message));

      const location = response.results[0].locations[0];
      const street = location.street;
      const city = location.adminArea5;
      const country = location.adminArea1;
      this.location = `${street}, ${city}, ${country}`;
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
