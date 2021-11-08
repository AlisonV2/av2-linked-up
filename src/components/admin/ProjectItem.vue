<template>
  <div class="card text-center">
    <div class="card-header title">
      {{ project.title }}
    </div>
    <h6 class="card-subtitle mb-2 text-muted">{{ project.artistName }}</h6>
    <p class="card-text">{{ project.description }}</p>
    <div class="card-footer text-muted">
      {{ project.createdAt}}
    </div>
  </div>
</template>

<script>

/**
 * @exports ProjectItem
 * @type {Component}
 * @requires Sentry
 * @vue-data {array} projects
 */
export default {
  name: 'ProjectItem',
  props: ['project', 'createdAt'],
};
</script>
