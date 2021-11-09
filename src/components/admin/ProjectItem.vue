<template>
  <div class="card text-center">
    <div class="card-header title">
      {{ project.title }}
    </div>
    <h6 class="card-subtitle mb-2 text-muted" v-if="role === 'client'">{{ project.artistName }}</h6>
    <h6 class="card-subtitle mb-2 text-muted" v-if="role === 'artist'">{{ project.clientName }}</h6>
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
  props: ['project', 'time'],
  data() {
    return {
      createdAt: '',
      role: '',
    };
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
