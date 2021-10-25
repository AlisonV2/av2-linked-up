<template>
  <div class="container">
    <HomeGeoloc />
    <HomeCategories />
  </div>
</template>

<script>
import HomeGeoloc from '@/components/home/Geoloc';
import HomeCategories from '@/components/home/Categories';

export default {
  name: 'Home',
  components: {
    HomeCategories,
    HomeGeoloc
  },
};
</script>
