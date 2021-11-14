<template>
  <div class="container">
    <div class="row">
      <HomeGeoloc />
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
