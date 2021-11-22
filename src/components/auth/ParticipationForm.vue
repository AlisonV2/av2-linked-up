<template>
  <form class="auth-form" @submit.prevent="setParticipation">
    <div class="row">
      <div class="col-12 text-center mb-4">
        <h2 class="title">Submit participation</h2>
      </div>
    </div>
    <div class="form-floating mb-3">
      <input
        type="number"
        class="form-control"
        placeholder="Please enter an amount of tickets"
        v-model="tickets"
        required
      />
      <label>How many tickets do you want ?</label>
    </div>
    <div class="error mb-3 mt-3">{{ error }}</div>
    <div class="btn-center">
      <app-button>Confirm</app-button>
    </div>
    <slot />
  </form>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports ParticipationForm
 * @type {Component}
 * @requires Sentry
 * @vue-data {number} tickets - v-model
 * @vue-event setParticipation
 */
export default {
  props: ['id'],
  data() {
    return {
      tickets: null,
      error: null,
    };
  },
  methods: {
    setParticipation() {
      const data = {
        eventId: this.id,
        tickets: this.tickets,
      };
      this.$store
        .dispatch('setParticipation', data)
        // .then(() => {
        //   this.$router.push({ name: 'AdminEvents' });
        // })
        .catch((err) => {
          this.error = err.message;
          Sentry.captureException(err);
          return;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: $dark;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}
</style>
