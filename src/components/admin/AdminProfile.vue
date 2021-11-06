<template>
  <ArtistDashboard v-if="role === 'artist'"/>
  <ClientDashboard v-if="role === 'client'"/>
</template>

<script>
import ArtistDashboard from '@/components/admin/ArtistDashboard.vue';
import ClientDashboard from '@/components/admin/ClientDashboard.vue';

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
