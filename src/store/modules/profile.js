import { auth, artistsCollection, storage } from '@/utils/firebase';

export default {
  state: {
    artistProfile: {},
    thumbnailUrl: ''
  },
  mutations: {
    setArtistProfile(state, payload) {
      state.artistProfile = payload;
    },
    setThumbnail(state, payload) {
      state.thumbnailUrl = payload;
    }
  },
  actions: {
    async setArtistProfile(_, payload) {
      const user = auth.currentUser.uid;

      try {
        await artistsCollection.doc(user).update({
          uid: user,
          name: payload.name,
          city: payload.city,
          zip: payload.zip,
          shop: payload.shop,
          style: payload.style,
          thumbnail: payload.thumbnail,
        });
      } catch (err) {
        console.log(err.message);
        return;
      }
    },
    async uploadThumbnail({commit}, payload) {
      const user = auth.currentUser.uid;
      const file = payload;
      const storageRef = storage.ref();
      const artistsRef = storageRef.child(`artists/${user}/${file.name}`);

        const task = await artistsRef.put(file);
        task.ref.getDownloadURL().then((res) => {
          commit('setThumbnail', res);
        });
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
      return state.artistProfile;
    },
  },
};
