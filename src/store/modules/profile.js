import { auth, artistsCollection, storage } from '@/utils/firebase';

export default {
  state: {
    artistProfile: {},
    thumbnailUrl: '',
    profile: {},
    artists: [],
  },
  mutations: {
    // Used for admin part
    setArtistProfile(state, payload) {
      state.artistProfile = payload;
    },
    setThumbnail(state, payload) {
      state.thumbnailUrl = payload;
    },
    // Used for public part
    setProfile(state, payload) {
      state.profile = payload;
    },
    setAllArtists(state, payload) {
      state.artists = payload;
    },
  },
  actions: {
    // Used for admin part
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
          socialLink: payload.socialLink,
          insta: payload.insta,
          description: payload.description
        });
      } catch (err) {
        console.log(err.message);
        return;
      }
    },
    async setArtistThumbnail({ commit }, payload) {
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
    // Used for public part
    async getArtistById({ commit }, payload) {
      const user = payload;
      const doc = await artistsCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      commit('setProfile', doc.data());
    },
    async getAllArtists({ commit }) {
      const snap = await artistsCollection.get();
      const artists = [];
      snap.forEach((doc) => [
        artists.push({
          id: doc.id,
          ...doc.data(),
        }),
      ]);
      commit('setAllArtists', artists);
    },
  },
  getters: {
    getArtistProfile(state) {
      return state.artistProfile;
    },
    getProfile(state) {
      return state.profile;
    },
    getAllArtists(state) {
      return state.artists;
    },
  },
};
