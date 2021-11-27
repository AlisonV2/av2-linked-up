<template>
  <div class="container col-6 home">
    <div>
      <BookingForm :id="id" />
    </div>
  </div>
</template>

<script>
import BookingForm from '@/components/auth/BookingForm';

/**
 * @exports BookingPassword
 * @requires BookingForm
 * @type {Page}
 */
export default {
  name: 'BookingPassword',
  components: {
    BookingForm,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>
