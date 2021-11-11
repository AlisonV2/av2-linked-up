<template>
  <div class="row artist-inbox">
    <div class="col-12" v-for="message in messages" :key="message.project">
      <router-link
        :to="{ name: 'MessageDetails', params: { id: message.project } }"
      >
        <div class="message-item">Conversation with : {{ message.client }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports ArtistInbox
 * @type {Component}
 * @requires Sentry
 */
export default {
  name: 'ArtistInbox',
  data() {
    return {
      messages: [],
    };
  },
  created() {
    this.$store
      .dispatch('getArtistMessages')
      .then(() => {
        this.messages = this.$store.getters.getArtistMessages;
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
};
</script>

<style lang="scss">
.message-item {
  color: $dark;
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}
</style>
