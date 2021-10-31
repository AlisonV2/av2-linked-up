<template>
  <div class="row geoloc-row">
    <form class="col-12 geoloc">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your location"
        />
        <span class="input-group-text material-icons">place</span>
      </div>
      <div class="btn-center">
        <app-button>Search</app-button>
      </div>
    </form>
  </div>
</template>

<script>
/**
 * @exports HomeGeoloc
 * @type {Component}
 */
export default {};
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
  font-size: 1.5rem!important;
  cursor: pointer;
}
</style>
