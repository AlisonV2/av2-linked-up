<template>
  <ArtistEvents v-if="role === 'artist'" />
  <ClientEvents v-if="role === 'client'" />
  <OrgaEvents v-if="role === 'organizer'" />
</template>

<script>
import ArtistEvents from '@/components/artists/ArtistEvents.vue';
import ClientEvents from '@/components/clients/ClientEvents.vue';
import OrgaEvents from '@/components/organizers/OrgaEvents.vue';

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
    OrgaEvents,
  },
  data() {
    return {
      role: '',
    };
  },
  created() {
    this.$store.dispatch('getUserRole').then(() => {
      this.role = this.$store.getters.getUserRole;
    });
  },
};
</script>
