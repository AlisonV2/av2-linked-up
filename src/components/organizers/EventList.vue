<template>
  <div class="row artists-list">
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
import EventItem from '@/components/organizers/EventItem';
import * as Sentry from '@sentry/vue';

/**
 * @exports ArtistList
 * @type {Component}
 * @vue-data {array} events
 * @vue-event created - Dispatch store action
 */
export default {
  name: 'EventList',
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
@include bp-down(md) {
  .artists-list {
    padding-right: 1rem;
    padding-left: 1rem;
  }
}
</style>
