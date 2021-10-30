<template>
  <form class="auth-form" @submit.prevent="login">
    <div class="row">
      <app-title mode="title-img">Welcome back!</app-title>
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
    <div class="error mb-3 mt-3">{{ error }}</div>
    <div class="btn-center">
      <app-button>Log in</app-button>
    </div>
  </form>
</template>

<script>
/**
 * @type Component
 * @name LoginForm
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
    /**
     * @description Dispatch login store action with form data
     * Redirect to AdminProfile on success
     * @method login
     * @param {object} userData
     * @async
     */
    async login() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', userData);
      } catch (err) {
        this.error = err.message;
        return;
      }
      this.$router.push({ name: 'AdminProfile' });
    },
  },
};
</script>
