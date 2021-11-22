<template>
  <app-title>Events you plan to attend</app-title>
  <div class="row client-events">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-3"
      v-for="event in events"
      :key="event.id"
    >
      <router-link :to="{ name: 'Event', params: { id: event.id } }">
        <EventItem :event="event" />
      </router-link>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';
import EventItem from '@/components/organizers/EventItem';

/**
 * @exports ClientEvents
 * @type {Component}
 */
export default {
  name: 'ClientEvents',
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
      .dispatch('getClientEvents')
      .then(() => {
        this.events = this.$store.getters.getClientEvents;
        console.log(this.events)
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
};
</script>
