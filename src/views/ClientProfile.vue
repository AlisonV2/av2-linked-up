<template>
  <div class="container profile-container">
    <div class="row mb-3">
      <app-title>{{ client.name }}</app-title>
    </div>
    <div class="row">
      <div class="col-12 col-lg-5 img-center">
        <img class="img-fluid" :src="client.thumbnail" :alt="client.name"/>
      </div>
      <div class="col-12 col-lg-7 text-center">
        <p class="accent-text">About</p>
        <p>{{ client.description }}</p>
        <p>
          <span class="accent-text">Location:</span> {{ client.city }} ({{
            client.zip
          }})
        </p>
        <p><span class="accent-text">Tattooed?</span> {{ client.tattooed }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports ClientProfile
 * @type {Page}
 * @requires Sentry
 * @vue-computed {object} client - Returned from store
 * @vue-event created - Dispatch store action on created hook
 */
export default {
  name: 'clientProfile',
  data() {
    return {
      client: {
        name: '',
        thumbnail: '',
        description: '',
        city: '',
        zip: '',
        tattooed: '',
      },
    };
  },
  async created() {
    await this.$store
      .dispatch('getClientById', this.$route.params.id)
      .then(() => {
        this.client = this.$store.getters.getClientProfile;
      })
      .catch((err) => Sentry.captureException(err));
  },
};
</script>

<style lang="scss">
.img-fluid {
  max-height: 20rem;
}
</style>
