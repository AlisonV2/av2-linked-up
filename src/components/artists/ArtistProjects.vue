<template>
  <div class="row">
    <div class="col-12 col-lg-6" v-if="projects.length">
      <div v-for="project in projects" :key="project.createdAt">
        {{ project.clientId }}
        {{ project.artistId }}
        {{ project.description }}
      </div>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports ArtistProjects
 * @type {Component}
 * @requires Sentry
 * @vue-data {array} projects
 */
export default {
  name: 'ArtistProjects',
  data() {
    return {
      projects: []
    };
  },
  created() {
    this.$store.dispatch('getArtistProjects')
    .then(() => {
      this.projects = this.$store.getters.getArtistProjects;
    }).catch((err) => {
      Sentry.captureException(err);
    });
  },
};
</script>
