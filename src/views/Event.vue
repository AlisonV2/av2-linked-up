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
          <p><span class="accent-text">Date :</span> {{ event.date }}</p>
        </div>
        <div class="mt-4 btn-center" @click="attendEvent" v-if="userLoggedIn">
          <app-button>Attend Event</app-button>
        </div>
        <div
          class="mt-4 btn-center"
          @click="bookEvent"
          v-if="userLoggedIn && role === 'artist'"
        >
          <app-button>Book a stand</app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue';
import { mapState } from 'vuex';

/**
 * @exports EventPage
 * @type {Page}
 * @requires Sentry
 * @vue-data {object} event
 * @vue-data {boolean} attend
 * @vue-data {boolean} book
 * @vue-data {string} role
 * @vue-data {string} tickets
 * @vue-data {string} stands
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
      role: '',
    };
  },
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
  },
  created() {
    this.$store
      .dispatch('getEventById', this.$route.params.id)
      .then(() => {
        this.event = this.$store.getters.getEventById;
      })
      .catch((err) => Sentry.captureException(err));

    this.$store
      .dispatch('getUserRole')
      .then(() => {
        this.role = this.$store.getters.getUserRole;
      })
      .catch((err) => {
        Sentry.captureException(err);
      });
  },
  methods: {
    attendEvent() {
      this.$router.push({
        name: 'Participation',
        params: { id: this.$route.params.id },
      });
    },
    bookEvent() {
      this.$router.push({
        name: 'Booking',
        params: { id: this.$route.params.id },
      });
    },
  },
};
</script>
