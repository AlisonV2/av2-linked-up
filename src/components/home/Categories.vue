<template>
  <div class="row">
    <app-title>Recherche par style</app-title>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <img src="blackwork.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Black Work</h5>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <img src="oldschool.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Old School</h5>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <img src="newschool.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Surréalisme</h5>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <img src="surrealism.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">New School</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.card-title {
  text-align: center;
  font-size: 1rem;
}

.card {
  border-radius: 4px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow;
  cursor: pointer;
  img {
    height: 12rem;
  }
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}
</style>
