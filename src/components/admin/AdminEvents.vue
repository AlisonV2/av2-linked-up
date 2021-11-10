<template>
  <ArtistEvents v-if="role === 'artist'" />
  <ClientEvents v-if="role === 'client'" />
</template>

<script>
import ArtistEvents from '@/components/artists/ArtistEvents.vue';
import ClientEvents from '@/components/clients/ClientEvents.vue';

/**
 * @exports AdminEvents
 * @type {Component}
 * @vue-data{string} role
 * @vue-event {number} getUserRole on created hook
 */
export default {
  name: 'AdminEvents',
  components: {
    ArtistEvents,
    ClientEvents,
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
