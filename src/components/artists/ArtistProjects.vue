<template>
  <div class="row" v-if="projects.length">
    <div
      class="col-12 col-md-6 col-xl-4"
      v-for="project in projects"
      :key="project"
    >
      <router-link
        :to="{
          name: 'ProjectDetails',
          params: { id: project.id, isArtist: true },
        }"
      >
        <ProjectItem :project="project" />
      </router-link>
    </div>
  </div>
  <div class="row" v-else>
    <div class="col-12 text-center">
      <h2>You don't have any project yet.</h2>
    </div>
  </div>
</template>

<script>
import ProjectItem from '@/components/admin/ProjectItem';

/**
 * @exports ArtistProjects
 * @type {Component}
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
    this.$store.dispatch('getArtistProjects').then(() => {
      this.projects = this.$store.getters.getArtistProjects;
    });
  },
};
</script>
