<template>
  <div class="container profile-container">
    <div class="row mb-3">
      <app-title>{{ event.name }}</app-title>
    </div>
    <div class="row">
      <div class="col-12 col-lg-5 img-center">
        <img class="img-fluid" :src="event.thumbnail" :alt="event.name" />
      </div>
      <div class="col-12 col-lg-7 text-center mb-2">
        <p class="accent-text">Description</p>
        <p>{{ event.description }}</p>
        <p>
          <span class="accent-text">Location :</span> {{ event.city }} ({{
            event.zip
          }})
        </p>
        <div class="col-12">
          <p>
            <span class="accent-text">Date :</span> {{ event.date }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';

/**
 * @exports EventPage
 * @type {Page}
 * @requires Sentry
 * @vue-data {object} event
 */
export default {
  name: 'Event',
  data() {
    return {
      event: {
        id: '',
        name: '',
        description: '',
        date: '',
        zip: '',
        city: '',
        thumbnail: '',
      },
    };
  },
  created() {
    this.$store
      .dispatch('getEventById', this.$route.params.id)
      .then(() => {
        this.event = this.$store.getters.getEventById;
      })
      .catch((err) => Sentry.captureException(err));
  },
};
</script>
