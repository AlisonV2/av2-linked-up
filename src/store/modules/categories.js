import { artistsCollection } from '@/utils/firebase';

/**
 * Vuex module for Search By Category
 * @module categories
 * @requires firebase
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {array} artists
   */
  state: {
    artists: [],
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {array} setArtistsByStyle - Mutates artists
   */
  mutations: {
    setArtistsByStyle(state, payload) {
      state.artists = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {void} getArtistsByStyle - Get artists from firebase collection based on style choice
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
  },
  getters: {},
};
