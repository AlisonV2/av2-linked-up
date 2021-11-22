<template>
  <div class="container col-6 home">
    <div>
      <ParticipationForm :id="id"/>
    </div>
  </div>
</template>

<script>
import ParticipationForm from '@/components/auth/ParticipationForm';

/**
 * @exports ParticipationPassword
 * @requires ParticipationForm
 * @type {Page}
 */
export default {
  name: 'ParticipationPassword',
  components: {
    ParticipationForm,
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  }
};
</script>
