<template>
  <div class="row client-inbox">
    <div class="col-12" v-for="message in messages" :key="message.project">
      <router-link
        :to="{ name: 'MessageDetails', params: { id: message.project } }"
      >
        <div class="message-item">Conversation with : {{ message.artist }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
/**
 * @exports ClientInbox
 * @type {Component}
 */
export default {
  name: 'ClientInbox',
  data() {
    return {
      messages: [],
    };
  },
  created() {
    this.$store.dispatch('getClientMessages').then(() => {
      this.messages = this.$store.getters.getClientMessages;
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
