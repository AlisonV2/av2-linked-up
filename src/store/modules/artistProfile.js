import { auth, artistsCollection } from '@/utils/firebase';
import * as Sentry from '@sentry/vue';

/**
 * Vuex module for artists' profiles
 * @module artistProfile
 * @requires firebase
 * @requires Sentry
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {object} artistProfile - Used for admin part of the website.
   * @property {array} artists - Used for the public parts of the website
   */
  state: {
    artistProfile: {},
    artists: [],
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {object} setArtistProfile - Mutates artistProfile
   * @property {array} setAllArtists - Mutates artists
   */
  mutations: {
    // Used for admin part
    setArtistProfile(state, payload) {
      state.artistProfile = payload;
    },
    setAllArtists(state, payload) {
      state.artists = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {function} setArtistProfile
   * @property {function} getArtistProfile
   * @property {function} getArtistById
   * @property {function} getAllArtists
   */
  actions: {
    /**
     * Admin part - Sets artist's profile in firebase's artistsCollection
     * @method setArtistProfile
     * @param {object} payload
     * @returns {void}
     */
    async setArtistProfile(_, payload) {
      const user = auth.currentUser.uid;
      const loc = payload.zip.substring(0, 2);

      try {
        await artistsCollection.doc(user).update({
          uid: user,
          name: payload.name,
          city: payload.city,
          zip: payload.zip,
          shop: payload.shop,
          style: payload.style,
          socialLink: payload.socialLink,
          insta: payload.insta,
          description: payload.description,
          loc: loc,
        });
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /**
     * Admin part
     * @description Get artist profile from firebase
     * @method getArtistProfile
     * @returns {array}
     */
    async getArtistProfile({ commit }) {
      const user = auth.currentUser.uid;

      try {
        const doc = await artistsCollection.doc(user).get();
        if (!doc.exists) {
          return;
        }
        commit('setArtistProfile', doc.data());
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /** Public part
     * @description Get artist by id
     * @method getArtistById
     * @param {object} payload
     * @returns {array}
     */
    async getArtistById({ commit }, payload) {
      const user = payload;
      try {
        const doc = await artistsCollection.doc(user).get();
        if (!doc.exists) {
          return;
        }
        commit('setArtistProfile', doc.data());
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
    /** Public part
     * @description Get artist by id
     * @method getAllArtists
     * @returns {array}
     */
    async getAllArtists({ commit }) {
      try {
        const snap = await artistsCollection.get();
        const artists = [];
        snap.forEach((doc) => [
          artists.push({
            id: doc.id,
            ...doc.data(),
          }),
        ]);
        commit('setAllArtists', artists);
      } catch (err) {
        Sentry.captureException(err);
        return;
      }
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @property {object} getArtistProfile - Gets artistProfile
   * @property {array} getAllArtists - Gets artists
   */
  getters: {
    getArtistProfile(state) {
      return state.artistProfile;
    },
    getAllArtists(state) {
      return state.artists;
    },
  },
};
