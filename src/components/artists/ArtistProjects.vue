<template>
  <div class="row" v-if="projects.length">
    <div class="col-12 col-md-6 col-xl-4" v-for="project in projects" :key="project">
      <router-link :to="{ name: 'ProjectDetails', params: { id: project.id, isArtist: true } }">
        <ProjectItem :project="project"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import ProjectItem from '@/components/admin/ProjectItem';
import * as Sentry from '@sentry/vue';

/**
 * @exports ArtistProjects
 * @type {Component}
 * @requires Sentry
 * @vue-data {array} projects
 */
export default {
  name: 'ArtistProjects',
  components: {
    ProjectItem,
  },
  data() {
    return {
      projects: [],
    };
  },
  created() {
    this.$store
      .dispatch('getArtistProjects')
      .then(() => {
        this.projects = this.$store.getters.getArtistProjects;
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
};
</script>
