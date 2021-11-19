<template>
  <div class="card text-center">
    <div class="card-header title">
      {{ event.name }}
      <h6 class="card-subtitle mb-2 text-muted">
        Event created by {{ event.orgaName }}
      </h6>
    </div>
    <p class="card-text">{{ event.description }}</p>
    <p class="card-text">{{ event.localisation }}</p>
    <div class="card-footer text-muted">
      {{ event.date }}
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports EventItem
 * @type {Component}
 * @vue-prop {object} event - event object
 * @vue-data {string} role - User role
 */
export default {
  name: 'eventItem',
  props: ['event'],
  data() {
    return {
      role: '',
    };
  },
  created() {
    this.$store
      .dispatch('getUserRole')
      .then(() => {
        this.role = this.$store.getters.getUserRole;
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
};
</script>
