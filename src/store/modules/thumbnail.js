import { auth, artistsCollection, storage } from '@/utils/firebase';
import * as Sentry from '@sentry/vue';

/**
 * Vuex module for artists' gallery
 * @module thumbnail
 * @requires firebase
 * @requires Sentry
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {string} artistThumbnail - Used for admin part of the website.
   */
  state: {
    artistThumbnail: '',
  },

  /**
   * @name Mutations
   * @type {object}
   * @property {array} setArtistThumbnail - Mutates artistThumbnail
   * @property {array} setThumbnail - Mutates thumbnail
   */
  mutations: {
    setArtistThumbnail(state, payload) {
      state.artistThumbnail = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {void} setArtistThumbnail
   */
  actions: {
    /**
     * Admin part
     * Sends thumbnail file to firebase storage, Get file URL from storage, Update thumbnail field with file url
     * @method setArtistThumbnail
     * @param {object} payload
     * @returns {string}
     */
    async setArtistThumbnail({ commit }, payload) {
      const user = auth.currentUser.uid;
      const file = payload;
      const storageRef = storage.ref();
      const artistsRef = storageRef.child(`artists/${user}/${file.name}`);

      const task = await artistsRef.put(file);
      const link = await task.ref.getDownloadURL();
      try {
        await artistsCollection.doc(user).update({
          thumbnail: link,
        });
        commit('setArtistThumbnail', link);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @property {string} getThumbnail - Access state thumbnail
   */
  getters: {
    getArtistThumbnail(state) {
      return state.artistThumbnail;
    },
  },
};
