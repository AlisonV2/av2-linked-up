<template>
  <div class="card text-center" :class="{'client-card': !isArtist}">
    <div class="card-header title">
      {{ project.title }}
      <span class="project-bullet"
        :class="{
          'project-pending': status === 'Pending',
          'project-progress': status === 'In progress',
          'project-accepted': status === 'Accepted',
          'project-denied': status === 'Denied',
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
      {{ createdAt }}
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

/**
 * @exports ProjectItem
 * @type {Component}
 * @requires Sentry
 * @vue-data {array} projects
 */
export default {
  name: 'ProjectItem',
  props: ['project', 'time', 'isArtist'],
  data() {
    return {
      createdAt: '',
      role: '',
    };
  },
  computed: {
    status() {
      return this.project.status;
    },
  },
  created() {
    this.formatDate();
    this.getUserRole();
  },
  methods: {
    formatDate() {
      this.createdAt = format(this.time.toDate(), 'dd/MM/yyyy');
    },
    async getUserRole() {
      await this.$store.dispatch('getUserRole').then(() => {
        this.role = this.$store.getters.getUserRole;
      });
    },
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
}

.project-bullet {
  position: relative;
  transform: translate( -3rem);
}

.project-pending {
  color: $secondary;
}

.project-progress {
  color: orange
}

.project-accepted {
  color: green;
}

.project-denied {
  color: red;
}

.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

</style>
