<template>
  <div class="container">
    <div class="row">
      <app-title mode="title-img">Search by style</app-title>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card" @click="setCategory('Black Work')">
          <img src="/img/blackwork.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Black Work</h5>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card" @click="setCategory('Old School')">
          <img src="/img/oldschool.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Old School</h5>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card" @click="setCategory('New School')">
          <img src="/img/newschool.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">New School</h5>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card" @click="setCategory('Surrealism')">
          <img src="/img/surrealism.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Surrealism</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @exports Categories
 * @type {Page}
 * @vue-data {array} artists - Artists accessed from store categories module
 * @vue-event setCategory - VuexAction - Dispatch store action
 */
export default {
  name: 'Categories',
  methods: {
    /**
     * Get category choice and redirect to CategoriesResults
     * Dispatch store action to get artists based on category selected
     * @function setCategory
     * @param {string} payload
     * @async
     */
    async setCategory(data) {
      await this.$store
        .dispatch('getArtistsByStyle', data)
        .then(() => this.$router.push({ name: 'CategoriesResults' }));
    },
  },
};
</script>

