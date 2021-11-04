<template>
    <div class="container col-6 home">
    <div v-if="showLogin">
      <LoginForm />
      <p class="mt-3 text-center">
        No account yet? <span class="toggle-form show-signup" @click="showLogin = false">Sign up</span> instead
      </p>
    </div>
    <div v-else>
      <RegisterForm />
      <p class="mt-3 text-center">
        Already registered? <span class="toggle-form show-login" @click="showLogin = true">Log in</span> instead
      </p>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm.vue';
import LoginForm from '@/components/auth/LoginForm.vue';

/**
 * @exports Login
 * @requires RegisterForm
 * @requires LoginForm
 * @type {Page}
 * @vue-data {boolean} showLogin - Toggles Login/Register form
 */
export default {
  name: 'Home',
  components: {
    RegisterForm,
    LoginForm
  },
  data() {
    return {
      showLogin: true
    }
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.toggle-form {
    color: $primary;
    cursor: pointer;
}
</style>
