<template>
  <div class="container">
    <div class="row">
      <app-title>Upcoming Events</app-title>
    </div>
    <EventList />
  </div>
</template>

<script>
import EventList from '@/components/organizers/EventList';

/**
 * @exports Conventions
 * @type {Page}
 */
export default {
  name: 'Events',
  components: {
    EventList,
  },
};
</script>
