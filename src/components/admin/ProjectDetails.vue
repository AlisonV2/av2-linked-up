<template>
  <div class="container" v-if="project">
    {{ project.title }}
    {{ project.artistName }}
    {{ project.clientName }}
    {{ project.description }}
    <!-- if project.status == pending -->
    <div class="btn-wrapper" @click="showForm = !showForm">
      <app-button>Contact {{ project.clientName }}</app-button>
    </div>
  </div>
  <div class="row" v-if="showForm">
    <form @submit.prevent="handleSubmit">
      <div class="form-floating mb-3" @submit.prevent="handleSubmit">
        <input
          class="form-control"
          type="textarea"
          v-model="message"
          placeholder="Message"
        />
        <label>Message</label>
        <div class="btn-wrapper">
          <app-button>Send message</app-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
/**
 * @exports ProjectDetails
 * @type {Page}
 * @vue-data {object} project
 * @vue-data {boolean} showForm
 * @vue-data {string} message
 * @vue-event {object} getProjectById
 * @vue-event {object} handleSubmit
 */
export default {
  name: 'ProjectDetails',
  data() {
    return {
      project: {},
      showForm: false,
      message: ''
    };
  },
  async created() {
    await this.$store.dispatch('getProjectById', this.$route.params.id);
    this.project = this.$store.getters.getProjectById;
  },
  methods: {
    handleSubmit() {
      const chat = {
        ...this.project,
        message: this.message,
      };
      this.$store.dispatch('startChat', chat);
    },
  },
};
</script>
