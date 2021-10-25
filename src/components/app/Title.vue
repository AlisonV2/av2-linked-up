<template>
    <div class="col-12 text-center mb-4 app-title">
      <h2 class="title">
        <img :class="mode" src="/img/title-bg.png"><span><slot /></span></h2>
    </div>
</template>

<script>
export default {
  props: ['mode'],
};
</script>

<style lang="scss">
.title-img {
    width: 22rem;
    position: absolute;
    z-index: -1;
    transform: translate(-2.7rem, -3.2rem);
}

.profile-title-img {
    width: 22rem;
    position: absolute;
    z-index: -1;
    transform: translate(-3.8rem, -3.2rem);
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