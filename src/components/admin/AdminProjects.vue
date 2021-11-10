<template>
  <ArtistProjects v-if="role === 'artist'"/>
  <ClientProjects v-if="role === 'client'"/>
</template>

<script>
import ArtistProjects from '@/components/artists/ArtistProjects.vue';
import ClientProjects from '@/components/clients/ClientProjects.vue';

/**
 * @exports AdminProjects
 * @type {Component}
 * @vue-data{string} role
 * @vue-event {number} getUserRole on created hook
 */
export default {
  name: 'AdminProfile',
  components: {
    ArtistProjects,
    ClientProjects,
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
