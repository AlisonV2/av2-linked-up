<template>
  <div class="row">
    <div class="col-12" v-for="event in events" :key="event.id">
      <h2 class="title">{{ event.name }}</h2>
      <p>Number of attendees: {{ event.attendees.length }}</p>
    </div>
  </div>
</template>

<script>
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
    this.$store.dispatch('getOrgaEvents').then(() => {
      this.events = this.$store.getters.getOrgaEvents;
    });
  },
};
</script>
