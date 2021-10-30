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
 * @category Pages
 * @name Home
 */
export default {
  name: 'Home',
  components: {
    HomeCategories,
    HomeGeoloc
  },
};
</script>
