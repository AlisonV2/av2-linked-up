<template>
  <div class="card text-center" :class="{ 'client-card': !isArtist }">
    <div class="card-header title">
      {{ project.title }}
      <span
        class="project-bullet"
        :class="{
          'project-pending': project.status === 'Pending',
          'project-progress': project.status === 'In progress',
          'project-accepted': project.status === 'Accepted',
          'project-denied': project.status === 'Denied',
        }"
        >&#9673;</span
      >
      <h6 class="card-subtitle mb-2 text-muted" v-if="role === 'client'">
        Project sent to {{ project.artistName }}
      </h6>
      <h6 class="card-subtitle mb-2 text-muted" v-if="role === 'artist'">
        Project requested by {{ project.clientName }}
      </h6>
    </div>
    <p class="card-text">{{ project.description }}</p>
    <div class="card-footer text-muted">
      {{ project.createdAt }}
    </div>
  </div>
</template>

<script>
/**
 * @exports ProjectItem
 * @type {Component}
 * @vue-prop {object} project - Project object
 * @vue-data {string} role - User role
 */
export default {
  name: 'ProjectItem',
  props: ['project', 'isArtist'],
  data() {
    return {
      role: '',
    };
  },
  created() {
    this.$store.dispatch('getUserRole').then(() => {
      this.role = this.$store.getters.getUserRole;
    });
  },
};
</script>

<style lang="scss" scoped>
.card-text {
  color: $dark !important;
}

.card-subtitle {
  font-family: $default-font !important;
  margin-top: 1rem;
}

.card-header {
  margin-bottom: 1rem;
  background-color: $light;
}

.card-footer {
  background-color: $light;
}
</style>
