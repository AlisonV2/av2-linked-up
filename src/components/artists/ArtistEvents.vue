<template>
  <app-title>Events you booked a stand for</app-title>
  <div class="row client-events">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-3"
      v-for="stand in stands"
      :key="stand.id"
    >
      <router-link :to="{ name: 'Event', params: { id: stand.id } }">
        <EventItem :event="stand" />
      </router-link>
    </div>
  </div>
  <app-title>Events you plan to attend</app-title>
  <div class="row client-events">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-3"
      v-for="event in attendance"
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
 * @exports ArtistEvents
 * @type {Component}
 */
export default {
  name: 'ArtistEvents',
  components: {
    EventItem,
  },
  data() {
    return {
      attendance: [],
      stands: [],
    };
  },
  created() {
    this.$store
      .dispatch('getArtistEvents')
      .then(() => {
        const data = this.$store.getters.getArtistEvents;
        this.stands = data.stands;
        this.attendance = data.attendance;
        console.log(this.stands)
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
};
</script>
