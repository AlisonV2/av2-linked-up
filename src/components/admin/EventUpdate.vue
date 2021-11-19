<template>
  <div class="card text-center">
    <div class="card-header title">
      {{ event.name }}
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
 * @exports EventUpdate
 * @type {Component}
 * @vue-prop {object} event - event object
 * @vue-data {string} role - User role
 */
export default {
  name: 'EventUpdate',
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
