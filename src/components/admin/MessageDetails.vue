<template>
  <div class="container">
      
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports MessageDetails
 * @type {Page}
 * @requires Sentry
 * @vue-data {array} messages
 */
export default {
  name: 'MessageDetails',
  data() {
    return {
      messages: []
    }
  },
  created() {
    this.$store.dispatch('getMessages', this.$route.params.id)
    .then(() => {
      this.messages = this.$store.getters.getMessages
    })
    .catch((err) => {
      Sentry.captureException(err);
    })
  }
}
</script>