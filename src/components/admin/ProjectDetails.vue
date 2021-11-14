<template>
  <div class="container profile-container py-4" v-if="project">
    <div class="row mb-4" v-if="isArtist">
      <div
        class="col-12 text-end"
        v-if="project.status === 'Pending' || 'In progress'"
      >
        <span class="project-status px-4" @click="setProjectStatus('Accepted')"
          >Accept project</span
        >
        <span class="project-status" @click="setProjectStatus('Denied')"
          >Refuse project</span
        >
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12 project-details text-center">
        <h2 class="project-title">{{ project.title }}</h2>
        <h3 class="project-subtitle" v-if="isArtist">
          Project requested by :
          <router-link
            :to="{ name: 'ClientProfile', params: { id: project.clientId } }"
            ><span>{{ project.clientName }}</span></router-link
          >
        </h3>
        <h3 v-if="!isArtist">
          Project sent to : <span>{{ project.artistName }}</span>
        </h3>
        <p>Sent: {{ project.createdAt }}</p>
        <div class="project-description mt-4">
          <p>
            {{ project.description }}
          </p>
        </div>
      </div>
      <div
        class="btn-wrapper btn-center mt-4"
        @click="showForm = !showForm"
        v-if="
          isArtist && (project.status === 'Pending' || 'Accepted') && !showForm
        "
      >
        <app-button>Contact {{ project.clientName }}</app-button>
      </div>
    </div>
    <div class="row" v-if="showForm && isArtist">
      <form class="col-12" @submit.prevent="handleSubmit">
        <div class="form-floating mb-3" @submit.prevent="handleSubmit">
          <input
            class="form-control"
            type="textarea"
            v-model="message"
            placeholder="Message"
          />
          <label>Message</label>
          <div class="btn-wrapper btn-center mt-4">
            <app-button>Send message</app-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

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
      project: {
        artistId: '',
        artistName: '',
        clientId: '',
        clientName: '',
        createdAt: '',
        description: '',
        id: '',
        title: '',
        status: ''
      },
      showForm: false,
      message: '',
      isArtist: false,
    };
  },
  created() {
    this.isArtist = this.$route.params.isArtist;
    this.$store
      .dispatch('getProjectById', this.$route.params.id)
      .then(() => {
        this.project = this.$store.getters.getProjectById;
      })
      .then(() => {
        if (this.project.status === 'Pending') {
          this.setProjectStatus('In progress');
        }
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
  methods: {
    handleSubmit() {
      const chat = {
        ...this.project,
        message: this.message,
      };
      this.$store.dispatch('startChat', chat);
    },
    setProjectStatus(status) {
      const project = {
        id: this.$route.params.id,
        status: status,
      };
      this.$store.dispatch('setProjectStatus', project);
    },
  },
};
</script>

<style lang="scss">
.project-title {
  font-size: 2rem;
  font-family: $accent-font;
  color: $primary;
  margin-bottom: 2rem;
}

.project-status {
  cursor: pointer;
}
</style>
