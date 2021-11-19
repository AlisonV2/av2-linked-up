<template>
  <div class="row mb-3">
    <app-button>Create New Event</app-button>
  </div>
  <div class="row" v-if="events.length">
    <div class="col-12 col-lg-4" v-for="event in events" :key="event.id">
      <EventItem :event="event" />
    </div>
  </div>
  <div class="row" v-else>
    <div class="col-12 text-center">
      <h2>You don't have any event yet.</h2>
    </div>
  </div>
</template>

<script>
import EventItem from '@/components/admin/EventItem';
import * as Sentry from '@sentry/vue';

/**
 * @exports OrgaEvents
 * @type {Component}
 * @requires Sentry
 */
export default {
  name: 'OrgaEvents',
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
