<template>
  <div class="row mb-3">
    <app-button>Create New Event</app-button>
  </div>
  <div class="row">
    <div
      class="col-12 col-lg-4"
      v-for="event in events"
      :key="event.id"
    >
      <EventItem :event="event"/>
    </div>
  </div>
</template>

<script>
import EventItem from '@/components/admin/EventItem';

/**
 * @exports OrgaEvents
 * @type {Component}
 */
export default {
  name: 'OrgaEvents',
  components: {
    EventItem
  }
};
</script>
