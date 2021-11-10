<template>
  <ArtistDashboard v-if="role === 'artist'"/>
  <ClientDashboard v-if="role === 'client'"/>
</template>

<script>
import ArtistDashboard from '@/components/artists/ArtistDashboard.vue';
import ClientDashboard from '@/components/clients/ClientDashboard.vue';

/**
 * @exports AdminProfile
 * @type {Component}
 * @vue-data{string} role
 * @vue-event {number} getUserRole on created hook
 */
export default {
  name: 'AdminProfile',
  components: {
    ArtistDashboard,
    ClientDashboard,
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
