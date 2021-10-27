<template>
  <header class="header admin-navbar">
    <div class="container-fluid">
      <nav class="navbar-container">
        <ul class="navbar-menu" :class="{ active: isActive }">
          <li class="nav-link align-middle">
            <span class="d-none d-sm-inline mx-3">Username</span>
            <i class="bi bi-person-circle"></i>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isActive: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.admin-navbar {
  background-color: $dark;
  height: 3.5rem;
  .navbar-container {
    display: flex;
    justify-content: flex-end;
  }
  .nav-item {
    color: $light;
  }
  span {
    color: $light;
  }
  .bi.bi-person-circle {
    font-size: 30px;
    color: $light;
    cursor: pointer;
    &:hover {
      color: $primary;
    }
  }
}
</style>
