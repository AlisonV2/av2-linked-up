import { auth, artistsCollection, storage } from '@/utils/firebase';

export default {
  state: {
    artistProfile: {},
    thumbnailUrl: '',
    artistGallery: [],
  },
  mutations: {
    setArtistProfile(state, payload) {
      state.artistProfile = payload;
    },
    setThumbnail(state, payload) {
      state.thumbnailUrl = payload;
    },
    setArtistGallery(state, payload) {
      state.artistGallery.push(payload);
    },
    addToGallery(state, payload) {
      state.artistGallery.push(payload);
      console.log(state.artistGallery)
    },
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
          gallery: [],
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
    async setArtistGallery({ commit }, payload) {
      const user = auth.currentUser.uid;
      const file = payload;
      const storageRef = storage.ref();
      const artistsRef = storageRef.child(`artists/${user}/${file.name}`);

      const task = await artistsRef.put(file);
      task.ref.getDownloadURL().then((res) => {
        commit('setArtistGallery', res);
      });
    },
    async addGallery(_, payload) {
        const user = auth.currentUser.uid;

        try {
          await artistsCollection.doc(user).update({
            gallery: payload,
          });
        } catch (err) {
          console.log(err.message);
          return;
        }
    },
    async setProfileGallery(_, payload) {
      const user = auth.currentUser.uid;

      try {
        await artistsCollection.doc(user).update({
          gallery: payload,
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
      return state.artistProfile;
    },
  },
};
