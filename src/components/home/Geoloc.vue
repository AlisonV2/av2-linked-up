<template>
  <div class="row geoloc-row">
    <div class="col-12 text-center">
      <h2 class="title">Recherche aux alentours</h2>
    </div>
    <form class="col-12 geoloc">
      <div class="mb-3">
        <input type="text" class="form-control" />
      </div>
      <div class="mb-3 btn-center">
        <app-button>Recherche</app-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@include bp-up(md) {
  .geoloc {
    max-width: 80% !important;
    margin: 0 auto;
  }
  .geoloc-row {
    margin-bottom: 3rem;
  }
}
</style>
