<template>
  <div class="container">
    <HomeGeoloc />
    <HomeCategories />
  </div>
</template>

<script>
import HomeGeoloc from '@/components/home/Geoloc';
import HomeCategories from '@/components/home/Categories';

/**
 * @exports Home
 * @requires HomeGeoloc
 * @requires HomeCategories
 * @type {Page}
 */
export default {
  name: 'Home',
  components: {
    HomeCategories,
    HomeGeoloc
  },
};
</script>
