import { artistsCollection } from '@/utils/firebase';

/**
 * Vuex module for Search
 * @module search
 * @requires firebase
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {array} artists
   * @property {array} artistsByCity
   */
  state: {
    artists: [],
    artistsByCity: [],
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {array} setArtistsByStyle - Mutates artists
   * @property {array} setArtistsByCity - Mutates artistsByCity
   */
  mutations: {
    setArtistsByStyle(state, payload) {
      state.artists = payload;
    },
    setArtistsByCity(state, payload) {
      state.artistsByCity = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {void} getArtistsByStyle - Get artists from firebase collection based on style choice
   * @property {void} getArtistsByCity - Get artists from firebase collection based on city input
   */
  actions: {
    /**
     * @description Get artists based on category selected
     * @method getArtistsByStyle
     * @param {string} payload
     * @returns {array}
     * @async
     */
    async getArtistsByStyle({ commit }, payload) {
      const snap = await artistsCollection.where('style', '==', payload).get();
      const artists = [];
      snap.forEach((doc) => [
        artists.push({
          id: doc.id,
          ...doc.data(),
        }),
      ]);
      commit('setArtistsByStyle', artists);
    },
    /**
     * @description Get artists based on category selected
     * @method getArtistsByCity
     * @param {string} payload
     * @returns {array}
     * @async
     */
    async getArtistsByCity({ commit }, payload) {
      const snap = await artistsCollection.where('loc', '==', payload).get();
      const artists = [];
      snap.forEach((doc) => [
        artists.push({
          id: doc.id,
          ...doc.data(),
        }),
      ]);
      commit('setArtistsByCity', artists);
    },
  },
  getters: {},
};
