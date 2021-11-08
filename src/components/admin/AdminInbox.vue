<template>
  <ArtistInbox v-if="role === 'artist'" />
  <ClientInbox v-if="role === 'client'" />
</template>

<script>
import ArtistInbox from '@/components/artists/ArtistInbox.vue';
import ClientInbox from '@/components/clients/ClientInbox.vue';

/**
 * @exports AdminInbox
 * @type {Component}
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
  async created() {
    await this.$store.dispatch('getUserRole').then(() => {
      this.role = this.$store.getters.getUserRole;
    });
  },
};
</script>
