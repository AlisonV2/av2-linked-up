<template>
  <footer class="container-fluid light-bg">
    <div class="row">
      <div class="col-12">
        <div class="footer-copyright">
          <p class="copyright">
            <span>
              &copy; Copyright {{ getDate() }} -
              <a target="_blank" href="https://alisonvandromme.com"
                >Alison Vandromme</a
              >
              - All rights reserved
            </span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  methods: {
    getDate() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss">
footer {
  text-align: center;
  font-family: $accent-font;
  font-size: 0.75rem;
  font-weight: 500;
  border-top: 1px solid $primary;
  padding: 1.5rem 0;
  position: relative;
  bottom: 0;
  margin-top: 3rem;
}
</style>
