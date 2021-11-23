<template>
  <footer class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="footer-copyright">
          <p class="copyright">
            <span class="footer-left">
              &copy; Copyright {{ year }} -
              <a
                target="_blank"
                rel="noopener"
                href="https://alisonvandromme.com"
                >Alison Vandromme</a
              >
              <span class="footer-right"> - All rights reserved</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
/**
 * @exports AppFooter
 * @type {Component}
 * @vue-data {string} year='' current year
 * @vue-event getDate - get current year
 */
export default {
  name: 'AppFooter',
  data() {
    return {
      year: '',
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    /**
     * @description Get current year
     * @method getDate
     * @returns {string} payload
     */
    getDate() {
      this.year = new Date().getFullYear();
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
  .footer-right {
    color: $light;
  }
}
</style>
