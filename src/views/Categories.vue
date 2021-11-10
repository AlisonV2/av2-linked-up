<template>
  <div class="container">
    <HomeCategories />
  </div>
</template>

<script>
import HomeCategories from '@/components/home/Categories';

/**
 * @exports Categories
 * @type {Page}
 * @requires HomeCategories
 */
export default {
  name: 'Categories',
  components: {
    HomeCategories,
  },

};
</script>
