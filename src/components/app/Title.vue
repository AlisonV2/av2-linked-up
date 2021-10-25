<template>
      <div class="col-12 text-center mb-4">
      <h2 class="title">
        <img class="title-img" src="title-bg.png"><span><slot /></span></h2>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.title-img {
    width: 22rem;
    position: absolute;
    z-index: -1;
    transform: translate(-2.7rem, -3.2rem);
}
</style>