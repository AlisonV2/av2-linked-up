import {
  auth,
  artistsCollection,
  clientsCollection,
  organizersCollection,
  storage,
} from '@/utils/firebase';
import * as Sentry from '@sentry/vue';

/**
 * Vuex module for thumbnails
 * @module thumbnail
 * @requires firebase
 * @requires Sentry
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {string} artistThumbnail - Used for admin part of the website.
   * @property {string} clientThumbnail - Used for admin part of the website.
   * @property {string} orgaThumbnail - Used for admin part of the website.
   */
  state: {
    artistThumbnail: '',
    clientThumbnail: '',
    orgaThumbnail: '',
  },

  /**
   * @name Mutations
   * @type {object}
   * @property {array} setArtistThumbnail - Mutates artistThumbnail
   * @property {array} setClientThumbnail - Mutates clientTumbnail
   * @property {array} setOrgaThumbnail - Mutates orgaTumbnail
   */
  mutations: {
    setArtistThumbnail(state, payload) {
      state.artistThumbnail = payload;
    },
    setClientThumbnail(state, payload) {
      state.clientThumbnail = payload;
    },
    setOrgaThumbnail(state, payload) {
      state.orgaThumbnail = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {string} setArtistThumbnail
   * @property {string} setClientThumbnail
   * @property {string} setOrgaThumbnail
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
    /**
     * Admin part
     * Sends thumbnail file to firebase storage, Get file URL from storage, Update thumbnail field with file url
     * @method setClientThumbnail
     * @param {object} payload
     * @returns {string}
     */
    async setClientThumbnail({ commit }, payload) {
      const user = auth.currentUser.uid;
      const file = payload;
      const storageRef = storage.ref();
      const clientsRef = storageRef.child(`clients/${user}/${file.name}`);

      const task = await clientsRef.put(file);
      const link = await task.ref.getDownloadURL();
      try {
        await clientsCollection.doc(user).update({
          thumbnail: link,
        });
        commit('setClientThumbnail', link);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * Admin part
     * Sends thumbnail file to firebase storage, Get file URL from storage, Update thumbnail field with file url
     * @method setOrgaThumbnail
     * @param {object} payload
     * @returns {string}
     */
    async setOrgaThumbnail({ commit }, payload) {
      const user = auth.currentUser.uid;
      const file = payload;
      const storageRef = storage.ref();
      const orgaRef = storageRef.child(`orga/${user}/${file.name}`);

      const task = await orgaRef.put(file);
      const link = await task.ref.getDownloadURL();
      try {
        await organizersCollection.doc(user).update({
          thumbnail: link,
        });
        commit('setOrgaThumbnail', link);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @property {string} getArtistThumbnail - Access state artistThumbnail
   * @property {string} getClientThumbnail - Access state clientThumbnail
   * @property {string} getOrgaThumbnail - Access state orgaThumbnail
   */
  getters: {
    getArtistThumbnail(state) {
      return state.artistThumbnail;
    },
    getClientThumbnail(state) {
      return state.clientThumbnail;
    },
    getOrgaThumbnail(state) {
      return state.orgaThumbnail;
    },
  },
};
