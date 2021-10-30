import { auth, galleriesCollection, storage } from '@/utils/firebase';

export default {
  state: {
    artistGallery: [],
    gallery: [],
    galleryFromId: []
  },
  mutations: {
    setArtistGallery(state, payload) {
      state.artistGallery = payload;
    },
    setGallery(state, payload) {
      state.gallery = payload;
    },
    setGalleryFromId(state, payload) {
      state.galleryFromId = payload;
    }
  },
  actions: {
    async setArtistGallery(_, payload) {
      const user = auth.currentUser.uid;
      const gallery = [];
      const files = payload;

      const storageRef = storage.ref();
      for (let i = 0; i < files.length; i++) {
        const artistsRef = storageRef.child(`artists/${user}/${files[i].name}`);
        const task = await artistsRef.put(files[i]);
        const link = await task.ref.getDownloadURL();
        gallery.push(link);
      }

      try {
        await galleriesCollection.doc(user).set({
          gallery: gallery,
        });
      } catch (err) {
        console.log(err.message);
        return;
      }
    },
    async getArtistGallery({ commit }) {
      const user = auth.currentUser.uid;
      await galleriesCollection.doc(user).get();
      const doc = await galleriesCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      commit('setGallery', doc.data());
    },
    async updateArtistGallery(_, payload) {
      const user = auth.currentUser.uid;
      const gallery = [];
      const files = payload;

      const storageRef = storage.ref();
      for (let i = 0; i < files.length; i++) {
        const artistsRef = storageRef.child(`artists/${user}/${files[i].name}`);
        const task = await artistsRef.put(files[i]);
        const link = await task.ref.getDownloadURL();
        gallery.push(link);
      }

      await galleriesCollection.doc(user).get();
      const doc = await galleriesCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }

      const updatedGallery = doc.data().gallery;
      console.log(updatedGallery)
      console.log(gallery)

      for (const i in gallery) {
        updatedGallery.push(gallery[i]);
        console.log(updatedGallery)
      }

      try {
        await galleriesCollection.doc(user).update({
          gallery: updatedGallery,
        });
      } catch (err) {
        console.log(err.message);
        return;
      }
    },
    async deleteImage(_, payload) {
      const user = auth.currentUser.uid;
      try {
        await galleriesCollection.doc(user).update({
          gallery: payload,
        });
      } catch (err) {
        console.log(err.message);
        return;
      }
    },
    async getGalleryFromId({ commit }, payload) {
      const user = payload;
      await galleriesCollection.doc(user).get();
      const doc = await galleriesCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      const gallery = doc.data().gallery;
      commit('setGalleryFromId', gallery);
    }
  },
  getters: {
    getGalleryFromId(state) {
      return state.galleryFromId;
    }
  }
};
