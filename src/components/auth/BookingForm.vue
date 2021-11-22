<template>
  <form class="auth-form" @submit.prevent="setBooking">
    <div class="row">
      <div class="col-12 text-center mb-4">
        <h2 class="title">Book a Stand</h2>
      </div>
    </div>
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        placeholder="Please confirm your email"
        v-model="email"
        required
      />
      <label>Please confirm your email</label>
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
 * @exports BookingForm
 * @type {Component}
 * @requires Sentry
 * @vue-data {number} emails - v-model
 * @vue-event resetPassword
 */
export default {
  props: ['id'],
  data() {
    return {
      email: '',
      error: null,
    };
  },
  methods: {
    setBooking() {
      const data = {
        eventId: this.id,
        email: this.email,
      }
      this.$store
        .dispatch('setBooking', data)
        .then(() => {
          this.$router.push({ name: 'AdminEvents' });
        })
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
