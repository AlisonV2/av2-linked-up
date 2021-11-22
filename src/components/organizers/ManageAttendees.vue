<template>
  <div class="row">
    <div class="col-12" v-for="event in events" :key="event.id">
      <h2 class="title">{{ event.name }}</h2>
      <p>{{ event.attendees.length }}</p>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports ManageAttendees
 * @type {Component}
 * @vue-data {array} events
 * @vue-event created - Dispatch store action
 */
export default {
  name: 'ManageAttendees',
  data() {
    return {
      events: [],
      attendees: null,
    };
  },
  created() {
    this.$store
      .dispatch('getOrgaEvents')
      .then(() => {
        this.events = this.$store.getters.getOrgaEvents;
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
};
</script>
