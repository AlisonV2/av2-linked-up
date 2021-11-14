import * as Sentry from '@sentry/vue';

/**
 * Vuex module for geoloc
 * @module geoloc
 * @requires Sentry
 */
export default {
  /**
   * @name State
   * @type {object}
   */
  state: {
    geoloc: {},
  },

  /**
   * @name Mutations
   * @type {object}
   */
  mutations: {
    setGeoloc(state, payload) {
      state.geoloc = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   */
  actions: {
    getGeoloc({ dispatch }) {
      let coords = {
        lat: '',
        lng: '',
      };

      navigator.geolocation.getCurrentPosition((position) => {
        coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        dispatch('setGeoloc', coords);
      });
    },
    async setGeoloc({ commit }, payload) {
      let response;
      await fetch(
        process.env.VUE_APP_MAPQUEST_API + payload.lat + ',' + payload.lng
      )
        .then((res) => res.json())
        .then((data) => (response = data))
        .catch((err) => Sentry.captureException(err));

      const res = response.results[0].locations[0];
      const location = res.adminArea5;
      const zip = res.postalCode;
      const loc = zip.substring(0, 2);
      const geoloc = {
        location: location,
        loc: loc,
      };
      commit('setGeoloc', geoloc);
    },
  },
  /**
   * @name Getters
   * @type {object}
   */
  getters: {
    getGeoloc(state) {
      return state.geoloc;
    },
  },
};
