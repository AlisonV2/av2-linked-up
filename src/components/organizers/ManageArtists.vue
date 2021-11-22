<template>
  <div class="row">
    <div class="col-12" v-for="event in events" :key="event.id">
      <h2 class="title">{{ event.name }}</h2>
      <div v-for="artist in event.stands" :key="artist.userId">
        {{ artist.userName }}
      </div>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports ManageArtists
 * @type {Component}
 * @vue-data {array} events
 * @vue-event created - Dispatch store action
 */
export default {
  name: 'ManageArtists',
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
  }
};
</script>
