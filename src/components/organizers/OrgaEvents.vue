<template>
  <div class="row mb-4">
    <div class="btn-wrapper btn-right">
      <router-link :to="{ name: 'NewEvent' }">
        <app-button>New Event</app-button></router-link
      >
    </div>
  </div>
  <div class="row" v-if="events.length">
    <div class="col-12 col-lg-4" v-for="event in events" :key="event.id">
      <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
        <EventUpdate :event="event" />
      </router-link>
    </div>
  </div>
  <div class="row" v-else>
    <div class="col-12 text-center">
      <h2>You don't have any event yet.</h2>
    </div>
  </div>
</template>

<script>
import EventUpdate from '@/components/admin/EventUpdate';
import * as Sentry from '@sentry/vue';

/**
 * @exports OrgaEvents
 * @type {Component}
 * @requires Sentry
 */
export default {
  name: 'OrgaEvents',
  components: {
    EventUpdate,
  },
  data() {
    return {
      events: [],
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
