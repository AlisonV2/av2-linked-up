<template>
  <form class="auth-form">
      <div class="row">
      <app-title>Glad you join us!</app-title>
  </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Your name"
        v-model="name"
        required
      />
      <label>Name</label>
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
      <app-button>Sign up</app-button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: null,
    };
  },
  // methods: {
  //   async register() {
  //     const userData = {
  //       name: this.name,
  //       email: this.email,
  //       password: this.password
  //     };
  //     try {
  //       await this.$store.dispatch('register', userData);
  //     } catch (err) {
  //       this.error = err.message;
  //       return;
  //     }
  //     this.$store.commit('toggleAuth');
  //     window.location.reload();
  //   }
  // }
};
</script>
