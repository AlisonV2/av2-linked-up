<template>
  <img class="img-fluid" :src="image" />
  <img class="img-fluid" :src="gallery" />
</template>

<script>
export default {
    props: ['image', 'gallery']
}
</script>

<style>

</style>