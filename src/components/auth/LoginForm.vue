<template>
  <form class="auth-form" @submit.prevent="login">
    <div class="row">
      <div class="col-12 text-center mb-4">
        <h2 class="title">
          Welcome back !
        </h2>
      </div>
    </div>
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        placeholder="name@example.com"
        v-model="email"
        required
      />
      <label>Email</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="password"
        class="form-control"
        placeholder="Password"
        v-model="password"
        required
      />
      <label>Password</label>
    </div>
    <div class="mb-3">
      <router-link :to="{name: 'Reset'}">Forgot your password ? </router-link>
    </div>
    <div class="error mb-3 mt-3">{{ error }}</div>
    <div class="btn-center">
      <app-button>Log in</app-button>
    </div>
      <slot />
  </form>
</template>

<script>
/**
 * @exports LoginForm
 * @type {Component}
 * @vue-data {string} email - v-model
 * @vue-data {string} password - v-model
 * @vue-data {string} error
 * @vue-event login
 */
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', userData);
      } catch (err) {
        this.error = err.message;
      }
      this.$router.push({ name: 'AdminProfile' });
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