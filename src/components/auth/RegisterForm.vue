<template>
  <form class="auth-form" @submit.prevent="register">
    <div class="row">
      <div class="col-12 text-center mb-4">
        <h2 class="title">
          Glad you join us !
        </h2>
      </div>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Your name"
        v-model="name"
        required
      />
      <label>Public Name</label>
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
    <div>
      <select class="form-select" v-model="role" required>
        <option disabled value="">You are...</option>
        <option value="artist">An artist</option>
        <option value="client">A (future) client</option>
        <option value="organizer">An organizer</option>
      </select>
    </div>
    <div class="error mb-3 mt-3">{{ error }}</div>
    <div class="btn-center">
      <app-button mode="signup-btn">Sign up</app-button>
    </div>
    <slot/>
  </form>
</template>

<script>
/**
 * @exports RegisterForm
 * @type {Component}
 * @vue-data {string} name - v-model
 * @vue-data {string} email - v-model
 * @vue-data {string} password - v-model
 * @vue-data {string} role - v-model
 * @vue-data {string} error
 * @vue-event register
 */
export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: '',
      error: null,
    };
  },
  methods: {
    async register() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      };
      try {
        await this.$store.dispatch('register', userData);
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