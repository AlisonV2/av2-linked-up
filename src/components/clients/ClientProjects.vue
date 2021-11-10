<template>
  <div class="row" v-if="projects.length">
    <div
      class="col-12 col-lg-4"
      v-for="project in projects"
      :key="project"
    >
      <ProjectItem :project="project" :time="project.createdAt"/>
    </div>
  </div>
</template>

<script>
import ProjectItem from '@/components/admin/ProjectItem';
import * as Sentry from '@sentry/vue';

/**
 * @exports ClientProjects
 * @type {Component}
 * @requires Sentry
 * @vue-data {array} projects
 */
export default {
  name: 'ClientProjects',
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
      .dispatch('getClientProjects')
      .then(() => {
        this.projects = this.$store.getters.getClientProjects;
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
};
</script>

<style lang="scss">
.project-item {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1.5rem;
}
</style>
