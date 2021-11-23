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
 * @exports Participation
 * @requires ParticipationForm
 * @type {Page}
 */
export default {
  name: 'Participation',
  components: {
    ParticipationForm,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>
