<template>
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
    <div
      class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
    >
      <router-link :to="{ name: 'Home' }" class="navbar-logo">
        <img class="admin-brand" src="/img/logo-light.png" />
      </router-link>
      <ul
        class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
        id="menu"
      >
        <li class="nav-item">
          <a href="#" class="nav-link align-middle px-0">
            <i class="fs-4 bi-house"></i>
            <span class="ms-3 d-none d-sm-inline">Home</span>
          </a>
        </li>
        <hr class="dropdown-divider" />
        <li>
          <a href="#submenu1" class="nav-link align-middle px-0">
            <i class="fs-4 bi-speedometer2"></i>
            <span class="ms-3 d-none d-sm-inline">Dashboard</span>
          </a>
        </li>
        <hr class="dropdown-divider" />
        <li>
          <a class="nav-link align-middle px-0">
            <i class="fs-4 bi-gear"></i>
            <span class="ms-3 d-none d-sm-inline">Profile</span>
          </a>
        </li>
        <hr class="dropdown-divider" />
        <li>
          <a href="#" class="nav-link align-middle px-0">
            <i class="fs-4 bi-envelope"></i>
            <span class="ms-3 d-none d-sm-inline">Messages</span></a
          >
        </li>
        <hr class="dropdown-divider" />
        <li>
          <a href="#" class="nav-link align-middle px-0">
            <i class="fs-4 bi-card-checklist"></i>
            <span class="ms-3 d-none d-sm-inline">Projects</span></a
          >
        </li>
        <hr class="dropdown-divider" />
        <li>
          <a href="#" class="nav-link align-middle px-0">
            <i class="fs-4 bi-calendar-date"></i>
            <span class="ms-3 d-none d-sm-inline">Events</span></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
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
