import { auth, clientsCollection } from '@/utils/firebase';
import * as Sentry from '@sentry/vue';

/**
 * Vuex module for clients' profiles
 * @module clientProfile
 * @requires firebase
 * @requires Sentry
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {object} clientProfile - Used for admin part of the website.
   */
  state: {
    clientProfile: {},
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {object} setClientProfile - Mutates clientProfile
   */
  mutations: {
    // Used for admin part
    setClientProfile(state, payload) {
      state.clientProfile = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {function} setClientProfile
   * @property {function} getClientProfile
   * @property {function} getClientById
   */
  actions: {
    /**
     * Admin part - Sets client's profile in firebase's clientsCollection
     * @method setClientProfile
     * @param {object} payload
     * @returns {void}
     */
    async setClientProfile(_, payload) {
      const user = auth.currentUser.uid;

      try {
        await clientsCollection.doc(user).update({
          uid: user,
          name: payload.name,
          description: payload.description,
          city: payload.city,
          zip: payload.zip,
          tattooed: payload.tattooed,
        });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * Admin part
     * @description Get client profile from firebase
     * @method getClientProfile
     * @returns {array}
     */
    async getClientProfile({ commit }) {
      const user = auth.currentUser.uid;
      const doc = await clientsCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      commit('setClientProfile', doc.data());
    },
    /** Public part
     * @description Get client by id
     * @method getClientById
     * @param {object} payload
     * @returns {array}
     */
    async getClientById({ commit }, payload) {
      const user = payload;
      const doc = await clientsCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      commit('setClientProfile', doc.data());
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @property {object} getClientProfile - Gets clientProfile
   */
  getters: {
    getClientProfile(state) {
      return state.clientProfile;
    },
  },
};
