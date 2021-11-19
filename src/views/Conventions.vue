<template>
<div class="container">
  <div class="row convention-row" data-test="conventions">
    <app-title>Upcoming events</app-title>
    <div class="col-12 col-lg-4" v-for="event in events" :key="event.id">
      <EventItem :event="event" />
    </div>
  </div>
</div>
</template>

<script>
import EventItem from '@/components/admin/EventItem';
import * as Sentry from '@sentry/vue';

/**
 * @exports Conventions
 * @type {Page}
 */
export default {
  name: 'Events',
  components: {
    EventItem,
  },
  data() {
    return {
      events: [],
    };
  },
  created() {
    this.$store
      .dispatch('getEvents')
      .then(() => {
        this.events = this.$store.getters.getEvents;
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
};
</script>

<style lang="scss">
.convention-row {
  width: 100%;
}
</style>
