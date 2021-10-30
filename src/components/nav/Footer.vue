<template>
  <footer class="container">
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
/**
 * @type Component
 * @name AppFooter
 * @vue-event getDate - get current year
 */
export default {
  name: 'AppFooter',
  methods: {
      /**
   * @description Get current year
   * @method getDate
   * @returns {string} payload
   */
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
  padding: 1.5rem 0;
  position: relative;
  bottom: 0;
  margin-top: 3rem;
}
</style>
