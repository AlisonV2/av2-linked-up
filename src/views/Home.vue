<template>
  <div class="container-fluid">
    <div class="row">
      <HomeGeoloc />
      <div class="col-12 col-md-6">
        <router-link :to="{ name: 'Categories' }" id="search-styles"
          ><app-title
            ><span class="main-title">Or search by styles <i class="bi bi-arrow-right"></i></span></app-title
        ></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HomeGeoloc from '@/components/home/Geoloc';

/**
 * @exports Home
 * @requires HomeGeoloc
 * @requires HomeStyles
 * @type {Page}
 */
export default {
  name: 'Home',
  components: {
    HomeGeoloc,
  },
};
</script>

<style lang="scss">
#search-styles {
  display: flex;
  justify-content: center;
}
</style>
