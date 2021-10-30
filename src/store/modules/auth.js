import {
  auth,
  usersCollection,
  artistsCollection,
  clientsCollection,
  organizersCollection,
} from '@/utils/firebase';

/**
 * Vuex module for artists' gallery
 * @module Authentication
 * @requires FirebaseConfig
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {boolean} userLoggedIn
   */
  state: {
    userLoggedIn: false,
  },
  /**
   * @name Mutations
   * @type {object}
   * @mutator {boolean} toggleAuth=userLoggedIn
   */
  mutations: {
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @getter {boolean} register=userLoggedIn
   * @getter {boolean} login=userLoggedIn
   * @getter {boolean} initLogin=userLoggedIn
   * @getter {boolean} logout=userLoggedIn
   */
  actions: {
    /**
     * @description Create user with email and password
     * @method register
     * @param {object} payload
     * @returns {boolean}
     * @async
     */
    async register({ commit }, payload) {
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );

      if (payload.role === 'artist') {
        await artistsCollection.doc(userCred.user.uid).set({
          name: payload.name,
        });
      }

      if (payload.role === 'client') {
        await clientsCollection.doc(userCred.user.uid).set({
          name: payload.name,
        });
      }

      if (payload.role === 'organizer') {
        await organizersCollection.doc(userCred.user.uid).set({
          name: payload.name,
        });
      }

      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        role: payload.role,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });

      commit('toggleAuth');
    },
    /**
     * @description Sign in with email and password
     * @method login
     * @param {object} payload
     * @returns {boolean}
     * @async
     */
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);

      commit('toggleAuth');
    },
    /**
     * @description Create user with email and password
     * @method initLogin
     * @returns {boolean}
     */
    initLogin({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
    /**
     * @description Logout user
     * @method logout
     * @returns {boolean}
     * @async
     */
    async logout({ commit }) {
      await auth.signOut();

      commit('toggleAuth');
    },
  },
};
