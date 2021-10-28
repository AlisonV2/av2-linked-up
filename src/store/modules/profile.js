import { auth, artistsCollection } from '@/utils/firebase';

export default {
  state: {
    artistProfile: {},
  },
  mutations: {
    setArtistProfile(state, payload) {
      state.artistProfile = payload;
    },
  },
  actions: {
    async setArtistProfile(_, payload) {
      const user = auth.currentUser.uid;
      try {
        await artistsCollection.doc(user).update({
            name: payload.name,
            city: payload.city,
            zip: payload.zip,
            shop: payload.shop,
            style: payload.style,           
        });
      } catch (err) {
        console.log(err.message);
        return;
      }
    },
    async getArtistProfile({ commit }) {
      const user = auth.currentUser.uid;
      const doc = await artistsCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      commit('setArtistProfile', doc.data());
    },
  },
  getters: {
    getArtistProfile(state) {
      console.log(state.artistProfile);
    },
  },
};
