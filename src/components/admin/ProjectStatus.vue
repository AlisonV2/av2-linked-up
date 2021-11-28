<template>
  <div class="row mb-4">
    <div class="col-12 status-description">
      <span class="project-bullet project-pending">&#9673;</span><span class="mx-2">Pending</span>
      <span class="project-bullet project-progress">&#9673;</span><span class="mx-2">In progress</span>
      <span class="project-bullet project-accepted">&#9673;</span><span class="mx-2">Accepted</span>
      <span class="project-bullet project-denied">&#9673;</span><span class="mx-2">Denied</span>
    </div>
  </div>
</template>

<script>
/**
 * @exports ProjectStatus
 * @type {Component}
 */
export default {
    name: 'ProjectStatus'
};
</script>

<style lang="scss">
.status-description {
  text-align: center;
}
</style>
