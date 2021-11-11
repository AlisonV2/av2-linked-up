<template>
  <div id="chat-window">
    <div class="col-12 mb-4" v-for="message in messages" :key="message.sender">
      <div
        class="chat-container mb-0"
        :class="[userId == message.sender ? 'darker' : '']"
      >
        <div :class="[userId == message.sender ? 'text-end' : '']">
          <span class="name">{{ message.senderName }}</span>
          <p class="message">{{ message.message }}</p>
        </div>
      </div>
      <div :class="[userId == message.sender ? 'text-end' : '']">
        <small class="text-muted px-3">{{ message.date }}</small>
      </div>
    </div>
  </div>
  <div class="row chat-row">
    <form @submit.prevent="sendMessage">
      <div class="input-group mb-3">
        <input
          class="form-control"
          type="textarea"
          placeholder="Your message"
          v-model="newMessage"
        />
        <button class="btn btn-outline-secondary" type="submit">Send</button>
      </div>
    </form>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports MessageDetails
 * @type {Page}
 * @requires Sentry
 * @vue-data {array} messages
 * @vue-data {string} newMessage
 * @vue-data {string} userId
 */
export default {
  name: 'MessageDetails',
  data() {
    return {
      messages: [],
      userId: '',
      newMessage: '',
    };
  },
  created() {
    this.$store
      .dispatch('getCurrentUser')
      .then(() => {
        this.userId = this.$store.getters.getCurrentUser;
      })
      .catch((err) => {
        Sentry.captureException(err);
      });

    this.getMessages();
  },
  methods: {
    sendMessage() {
      const projectId = this.$route.params.id;
      const message = {
        projectId: projectId,
        message: this.newMessage,
      };
      this.$store
        .dispatch('sendMessage', message)
        .then(() => {
          this.getMessages();
        })
        .then(() => {
          this.newMessage = '';
        })
        .catch((err) => {
          Sentry.captureException(err);
        });
    },
    getMessages() {
      this.$store
        .dispatch('getMessages', this.$route.params.id)
        .then(() => {
          this.messages = this.$store.getters.getMessages;
        })
        .then(() => {
          const element = document.querySelector('#chat-window');
          element.scrollTop = element.scrollHeight;
        })
        .catch((err) => {
          Sentry.captureException(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#chat-window {
  overflow-y: scroll;
  height: 70vh;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}

.message {
  margin-bottom: 0;
}
/* Chat containers */
.chat-container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}

/* Clear floats */
.container::after {
  content: '';
  clear: both;
  display: table;
}

/* Style images */
.container img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

/* Style the right image */
.container img.right {
  float: right;
  margin-left: 20px;
  margin-right: 0;
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
}

.chat-row {
  position: absolute;
  bottom: 2rem;
  width: 70%;
}
</style>
