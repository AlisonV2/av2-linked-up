<template>
  <div class="container">
    <div class="row">
      <div class="col-12 messages">
        <div class="single" v-for="(message, i) in messages" :key="message.sender">
          <span class="created-at">{{ message[i].date.toDate() }}</span>
          <span class="name">{{ message[i].senderName}}</span>
          <span class="message">{{ message[i].message }}</span>
        </div>
      </div>
    </div>
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
      messages: [],
    };
  },
  created() {
    this.$store
      .dispatch('getMessages', this.$route.params.id)
      .then(() => {
        this.messages = this.$store.getters.getMessages;
        console.log(this.messages)
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
};
</script>

<style lang="scss">
.single {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }
</style>
