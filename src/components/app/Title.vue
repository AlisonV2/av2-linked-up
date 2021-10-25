<template>
    <div class="col-12 text-center mb-4 app-title">
      <h2 class="title">
        <img class="title-img" src="/img/title-bg.png"><span><slot /></span></h2>
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

@include bp-up(md) {
    .app-title {
        margin-top: 1rem;
    }
}

.app-title {
    margin-top: 2rem;
}
</style>