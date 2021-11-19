import { auth, organizersCollection } from '@/utils/firebase';
import * as Sentry from '@sentry/vue';

/**
 * Vuex module for organizers' profiles
 * @module orgaProfile
 * @requires firebase
 * @requires Sentry
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {object} orgaProfile - Used for admin part of the website.
   */
  state: {
    orgaProfile: {},
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {object} setOrgaProfile - Mutates orgaProfile
   */
  mutations: {
    // Used for admin part
    setOrgaProfile(state, payload) {
      state.orgaProfile = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {function} setOrgaProfile
   * @property {function} getOrgaProfile
   * @property {function} getOrgaById
   */
  actions: {
    /**
     * Admin part - Sets orga's profile in firebase's organizersCollection
     * @method setOrgaProfile
     * @param {object} payload
     * @returns {void}
     */
    async setOrgaProfile(_, payload) {
      const user = auth.currentUser.uid;

      try {
        await organizersCollection.doc(user).update({
          uid: user,
          name: payload.name,
          city: payload.city,
          zip: payload.zip,
        });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * Admin part
     * @description Get orga profile from firebase
     * @method getOrgaProfile
     * @returns {object}
     */
    async getOrgaProfile({ commit }) {
      const user = auth.currentUser.uid;
      const doc = await organizersCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      commit('setOrgaProfile', doc.data());
    },
    /** Public part
     * @description Get orga by id
     * @method getOrgaById
     * @param {object} payload
     * @returns {array}
     */
    async getOrgaById({ commit }, payload) {
      const user = payload;
      const doc = await organizersCollection.doc(user).get();
      if (!doc.exists) {
        return;
      }
      commit('setOrgaProfile', doc.data());
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @property {object} getOrgaProfile - Gets orgaProfile
   */
  getters: {
    getOrgaProfile(state) {
      return state.orgaProfile;
    },
  },
};
