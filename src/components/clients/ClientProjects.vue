<template>
  <div class="row">
    <div class="col-12 col-lg-6" v-if="projects.length">
      <div v-for="project in projects" :key="project.createdAt">
        {{ project.clientId }}
        {{ project.artistId }}
        {{ project.description }}
        {{ project.artistName }}
      </div>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports ClientProjects
 * @type {Component}
 * @requires Sentry
 * @vue-data {array} projects
 */
export default {
  name: 'ClientProjects',
  data() {
    return {
      projects: []
    };
  },
  created() {
    this.$store.dispatch('getClientProjects')
    .then(() => {
      this.projects = this.$store.getters.getClientProjects;
    }).catch((err) => {
      Sentry.captureException(err);
    });
  },
  methods: {},
};
</script>

<style></style>
