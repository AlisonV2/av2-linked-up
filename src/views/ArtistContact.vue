<template>
  <div class="container">
    <form class="auth-form" @submit.prevent="handleSubmit">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="title"
          v-model="title"
          required
        />
        <label>Title</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="textarea"
          class="form-control"
          placeholder="Description"
          v-model="description"
          required
        />
        <label>Description</label>
      </div>
      <div class="btn-center">
        <app-button>Submit</app-button>
      </div>
    </form>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

export default {
  name: 'ArtistContact',
  data() {
    return {
      id: '',
      artist: {},
      userId: '',
      description: '',
      title: '',
    };
  },
  created() {
    this.$store.dispatch('getCurrentUser');
    this.id = this.$route.params.id;
    this.userId = this.$store.getters.getCurrentUser;
    this.artist = this.$route.params.artist;
  },
  methods: {
    handleSubmit() {
      const project = {
        clientId: this.userId,
        artistId: this.id,
        artistName: this.artist,
        title: this.title,
        description: this.description,
      };
      this.$store.dispatch('setNewProject', project).then(() => {
        this.$router
          .push({ name: 'AdminProjects' })
          .catch((err) => Sentry.captureException(err));
      });
    },
  },
};
</script>

<style></style>
