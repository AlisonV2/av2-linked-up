<template>
  <div class="container col-6 home">
    <div>
      <ResetForm />
    </div>
  </div>
</template>

<script>
import ResetForm from '@/components/auth/ResetForm';

/**
 * @exports ResetPassword
 * @requires ResetForm
 * @type {Page}
 */
export default {
  name: 'ResetPassword',
  components: {
    ResetForm,
  },
};
</script>
