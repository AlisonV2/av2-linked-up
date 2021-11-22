<template>
  <form class="auth-form" @submit.prevent="resetPassword">
    <div class="row">
      <div class="col-12 text-center mb-4">
        <h2 class="title">Reset Password</h2>
      </div>
    </div>
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        placeholder="Please enter your email"
        v-model="email"
        required
      />
      <label>Email</label>
    </div>
    <div class="error mb-3 mt-3">{{ error }}</div>
    <div class="btn-center">
      <app-button>Reset password</app-button>
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
 * @vue-data {string} email - v-model
 * @vue-event resetPassword
 */
export default {
  data() {
    return {
      email: '',
      error: null,
    };
  },
  methods: {
    resetPassword() {
      this.$store
        .dispatch('resetPassword', this.email)
        .then(() => {
          this.$router.push({ name: 'Login' });
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
