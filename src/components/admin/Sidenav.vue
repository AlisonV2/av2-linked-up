<template>
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
    <div
      class="
        d-flex
        flex-column
        align-items-center align-items-sm-start
        px-3
        pt-2
        text-white
        min-vh-100
      "
    >
      <router-link :to="{ name: 'Home' }" class="navbar-logo">
        <img class="admin-brand" src="/img/logo-light.png" alt="Brand logo" />
      </router-link>
      <ul
        class="
          nav nav-pills
          flex-column
          mb-sm-auto mb-0
          align-items-center align-items-sm-start
        "
        id="menu"
      >
        <li>
          <router-link
            :to="{ name: 'AdminProfile' }"
            class="nav-link align-middle px-0"
          >
            <i class="fs-4 bi-gear"></i>
            <span class="ms-3 d-none d-sm-inline">Profile</span>
          </router-link>
        </li>
        <hr class="dropdown-divider" />
        <li class="nav-item" v-if="role === 'artist'">
          <router-link
            :to="{ name: 'AdminGallery' }"
            class="nav-link align-middle px-0"
          >
            <i class="fs-4 bi-images"></i>
            <span class="ms-3 d-none d-sm-inline">Gallery</span>
          </router-link>
        </li>
        <hr class="dropdown-divider" v-if="role === 'artist'" />
        <li v-if="role === 'artist' || role === 'client'">
          <router-link
            :to="{ name: 'AdminProjects' }"
            class="nav-link align-middle px-0"
          >
            <i class="fs-4 bi-card-checklist"></i>
            <span class="ms-3 d-none d-sm-inline">Projects</span></router-link
          >
        </li>
        <hr
          class="dropdown-divider"
          v-if="role === 'artist' || role === 'client'"
        />
        <li>
          <router-link
            :to="{ name: 'AdminInbox' }"
            class="nav-link align-middle px-0"
          >
            <i class="fs-4 bi-envelope"></i>
            <span class="ms-3 d-none d-sm-inline">Messages</span></router-link
          >
        </li>
        <hr class="dropdown-divider" />
        <li>
          <router-link
            :to="{ name: 'AdminEvents' }"
            class="nav-link align-middle px-0"
          >
            <i class="fs-4 bi-calendar-date"></i>
            <span class="ms-3 d-none d-sm-inline">Events</span></router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports Sidenav
 * @type {Component}
 * @requires Sentry
 */
export default {
  name: 'Sidenav',
  data() {
    return {
      role: '',
    };
  },
  created() {
    this.$store
      .dispatch('getUserRole')
      .then(() => {
        this.role = this.$store.getters.getUserRole;
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
};
</script>

<style lang="scss" scoped>
a,
.bi {
  color: $light;
}

a:hover,
.bi:hover,
a:active,
.bi:active {
  color: $primary;
  cursor: pointer;
}

.admin-brand {
  display: none;
}

@include bp-up(sm) {
  .dropdown-divider {
    border: 1px solid $light !important;
    width: 8rem;
  }
  .admin-brand {
    width: 8rem;
    transform: translate(1rem, -3rem);
    display: block;
  }
}
</style>
