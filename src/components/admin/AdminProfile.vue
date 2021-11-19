<template>
  <ArtistDashboard v-if="role === 'artist'"/>
  <ClientDashboard v-if="role === 'client'"/>
  <OrgaDashboard v-if="role === 'organizer'"/>
</template>

<script>
import ArtistDashboard from '@/components/artists/ArtistDashboard.vue';
import ClientDashboard from '@/components/clients/ClientDashboard.vue';
import OrgaDashboard from '@/components/organizers/OrgaDashboard.vue';

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
    OrgaDashboard
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
