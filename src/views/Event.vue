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
        <div class="btn-group">
          <div
            class="mt-4 btn-center px-2 attend-event"
            @click="attendEvent"
            v-if="role === 'client' || role === 'artist'"
          >
            <app-button>Attend Event</app-button>
          </div>
          <div
            class="mt-4 btn-center book-event"
            @click="bookEvent"
            v-if="role === 'artist'"
          >
            <app-button>Book a stand</app-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <app-title>Participating artists</app-title>
    </div>
    <div class="row artists-list">
      <div
        class="col-12 col-md-6 col-lg-3 col-xl-3"
        v-for="artist in artists"
        :key="artist.name"
      >
        <router-link :to="{ name: 'Profile', params: { id: artist.uid } }">
          <ArtistItem :artist="artist" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ArtistItem from '@/components/artists/ArtistItem';

/**
 * @exports EventPage
 * @type {Page}
 * @vue-data {object} event
 * @vue-data {boolean} attend
 * @vue-data {boolean} book
 * @vue-data {string} role
 * @vue-data {string} tickets
 * @vue-data {string} stands
 */
export default {
  name: 'Event',
  components: {
    ArtistItem,
  },
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
        attendees: [],
        stands: [],
      },
      role: '',
      artists: [],
    };
  },
  created() {
    this.$store.dispatch('getEventById', this.$route.params.id).then(() => {
      this.event = this.$store.getters.getEventById;
    });

    this.$store.dispatch('getUserRole').then(() => {
      this.role = this.$store.getters.getUserRole;
    });

    this.$store.dispatch('getEventArtists', this.$route.params.id).then(() => {
      this.artists = this.$store.getters.getEventArtists;
      console.log(this.artists);
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
