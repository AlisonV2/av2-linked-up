<template>
  <ArtistInbox v-if="role === 'artist'" />
  <ClientInbox v-if="role === 'client'" />
</template>

<script>
import * as Sentry from '@sentry/vue';
import ArtistInbox from '@/components/artists/ArtistInbox.vue';
import ClientInbox from '@/components/clients/ClientInbox.vue';

/**
 * @exports AdminInbox
 * @type {Component}
 * @requires Sentry
 * @vue-data{string} role
 * @vue-event {number} getUserRole on created hook
 */
export default {
  name: 'AdminProfile',
  components: {
    ArtistInbox,
    ClientInbox,
  },
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
