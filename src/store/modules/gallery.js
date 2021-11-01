import { auth, galleriesCollection, storage } from '@/utils/firebase';
import * as Sentry from '@sentry/vue';

/**
 * Vuex module for artists' gallery
 * @module gallery
 * @requires firebase
 * @requires Sentry
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {array} artistGallery - Used for admin part of the website.
   * @property {array} gallery
   * @property {array} galleryFromId
   */
  state: {
    artistGallery: [],
    gallery: [],
    galleryFromId: [],
  },

  /**
   * @name Mutations
   * @type {object}
   * @property {array} setArtistGallery - Mutates artistGallery
   * @property {array} setGallery - Mutates gallery
   * @property {array} setGalleryFromId - Mutates galleryFromId
   */
  mutations: {
    setArtistGallery(state, payload) {
      state.artistGallery = payload;
    },
    setGallery(state, payload) {
      state.gallery = payload;
    },
    setGalleryFromId(state, payload) {
      state.galleryFromId = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {void} setArtistGallery
   * @property {array} getArtistGallery=gallery
   * @property {void} updateArtistGallery
   * @property {array} getAllArtists=artists
   * @property {void} deleteImage
   * @property {array} getGalleryFromId=galleryFromId
   */
  actions: {
    /**
     * @description Admin part - Sets artist's gallery.
     * Send files to firebase storage
     * Get file URL from storage
     * Set URLs as gallery for this artist
     * @method setArtistGallery
     * @param {array} payload
     * @returns {void}
     * @async
     */
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
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * @description Admin part - Get gallery from current user's id
     * @method getArtistGallery
     * @returns {void}
     * @async
     */
    async getArtistGallery({ commit }) {
      const user = auth.currentUser.uid;
      await galleriesCollection.doc(user).get();
      const doc = await galleriesCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      commit('setGallery', doc.data());
    },
    /**
     * @description Admin part - Get gallery from current user's id
     * @method updateArtistGallery
     * @param {array} payload
     * @returns {void}
     * @async
     */
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
      console.log(updatedGallery);
      console.log(gallery);

      for (const i in gallery) {
        updatedGallery.push(gallery[i]);
        console.log(updatedGallery);
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
    /**
     * @description Admin part - Delete image from artist's gallery array in firebase
     * @method deleteImage
     * @param {array} payload
     * @returns {void}
     * @async
     */
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
    /**
     * @description Get artist's gallery from artist's id
     * @method getGalleryFromId
     * @param {string} payload
     * @returns {array}
     * @async
     */
    async getGalleryFromId({ commit }, payload) {
      const user = payload;
      await galleriesCollection.doc(user).get();
      const doc = await galleriesCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      const gallery = doc.data().gallery;
      commit('setGalleryFromId', gallery);
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @property {object} getGalleryFromId - Access state galleryFromId
   */
  getters: {
    getGalleryFromId(state) {
      return state.galleryFromId;
    },
  },
};
