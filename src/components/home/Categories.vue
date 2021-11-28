<template>
  <div class="row">
    <app-title mode="title-img">Search by style</app-title>
    <div class="col-12 cold-md-6 col-lg-4 col-xl-3">
      <div
        class="card"
        data-test="black-work"
        @click="setCategory('Black Work')"
      >
        <img src="/img/blackwork.jpg" class="card-img-top" alt="blackwork" />
        <div class="card-body">
          <h5 class="card-title">Black Work</h5>
        </div>
      </div>
    </div>
    <div class="col-12 cold-md-6 col-lg-4 col-xl-3">
      <div class="card" @click="setCategory('Old School')">
        <img src="/img/oldschool.jpg" class="card-img-top" alt="oldschool" />
        <div class="card-body">
          <h5 class="card-title">Old School</h5>
        </div>
      </div>
    </div>
    <div class="col-12 cold-md-6 col-lg-4 col-xl-3">
      <div class="card" @click="setCategory('New School')">
        <img src="/img/newschool.jpg" class="card-img-top" alt="newschool" />
        <div class="card-body">
          <h5 class="card-title">New School</h5>
        </div>
      </div>
    </div>
    <div class="col-12 cold-md-6 col-lg-4 col-xl-3">
      <div class="card" @click="setCategory('Surrealism')">
        <img src="/img/surrealism.jpg" class="card-img-top" alt="surrealism" />
        <div class="card-body">
          <h5 class="card-title">Surrealism</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @exports HomeCategories
 * @type {Component}
 * @vue-event setCategory - Dispatch getArtistsByStyle store action
 */
export default {
  methods: {
    async setCategory(data) {
      await this.$store
        .dispatch('getArtistsByStyle', data)
        .then(() => this.$router.push({ name: 'CategoriesResults' }));
    },
  },
};
</script>

<style lang="scss" scoped>
.card-title {
  font-size: 1rem;
  font-family: $default-font;
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
