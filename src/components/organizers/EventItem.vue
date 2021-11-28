<template>
  <div class="card Event-card">
    <div class="card-overlay"></div>
    <div class="card-details fade-in-top text-center">
      <h5 class="card-title" :data-test="event.id">{{ event.name }}</h5>
      <p class="card-text">{{ event.city }} ({{ event.zip }})</p>
    </div>
    <img
      :src="event.thumbnail"
      class="card-img-top"
      :alt="event.id"
    />
    <div class="card-body">
      <h5 class="card-title">{{ event.name }}</h5>
    </div>
  </div>
</template>

<script>
/**
 * @exports EventItem
 * @type {Component}
 * @vue-prop {object} events
 */
export default {
  name: 'EventItem',
  props: ['event'],
};
</script>

<style lang="scss" scoped>
.event-card {
  .card-title {
    font-family: $accent-font;
    color: $primary;
    font-size: 1.2rem;
  }
  .card-text {
    color: $light;
  }
  .card-details {
    position: absolute;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    width: 100%;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-in-out 0s;
    .card-title {
      margin-bottom: 2rem;
    }
  }
  .card-overlay {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    transition: all 0.4s ease-in-out 0s;
  }
}

.Event-card:hover {
  .card-overlay {
    opacity: 1;
  }
  .card-details {
    display: block;
    top: 50%;
    left: 50%;
    opacity: 1;
  }
}

.fade-in-top {top: 20%};
</style>
