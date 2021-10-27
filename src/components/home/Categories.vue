<template>
  <div class="row">
    <app-title mode="title-img">Search by style</app-title>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <img src="/img/blackwork.jpg" class="card-img-top" alt="blackwork" />
        <div class="card-body">
          <h5 class="card-title">Black Work</h5>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <img src="/img/oldschool.jpg" class="card-img-top" alt="oldschool" />
        <div class="card-body">
          <h5 class="card-title">Old School</h5>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <img src="/img/newschool.jpg" class="card-img-top" alt="newschool" />
        <div class="card-body">
          <h5 class="card-title">New School</h5>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card">
        <img src="/img/surrealism.jpg" class="card-img-top" alt="surrealism" />
        <div class="card-body">
          <h5 class="card-title">Surrealism</h5>
        </div>
      </div>
    </div>
    <div class="col-12 text-end">
      <router-link :to="{ name: 'Categories' }"><p class="link-text">See all styles</p></router-link>
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
  font-family: $default-font;
}

.card {
  border-radius: 4px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow;
  cursor: pointer;
  margin-bottom: 1rem;
  img {
    height: 12rem;
  }
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

.link-text {
  font-size: 1rem;
  font-family: $accent-font;
}
</style>
