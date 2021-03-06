import {
  auth,
  usersCollection,
  artistsCollection,
  clientsCollection,
  organizersCollection,
} from '@/utils/firebase';

import * as Sentry from '@sentry/vue';

/**
 * Vuex module for authentication
 * @module auth
 * @requires firebase
 */
export default {
  /**
   * @name State
   * @type {object}
   * @property {boolean} userLoggedIn
   * @property {string} userRole
   * @property {object} currentUser
   */
  state: {
    userLoggedIn: false,
    userRole: '',
    currentUser: '',
  },
  /**
   * @name Mutations
   * @type {object}
   * @property {boolean} toggleAuth - Mutates userLoggedIn
   */
  mutations: {
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    setUserRole(state, payload) {
      state.userRole = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
  },
  /**
   * @name Actions
   * @type {object}
   * @property {boolean} register - Register a user with firebase authentication
   * @property {boolean} login - Logs a user in with firebase authentication
   * @property {boolean} initLogin - Checks if a user is already logged in
   * @property {boolean} logout - Logs a user out
   * @property {object} getCurrentUser - Get current user from firebase auth object
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
      try {
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
      } catch (err) {
        Sentry.captureException(err);
      }
    },
    /**
     * @description Sign in with email and password
     * @method login
     * @param {object} payload
     * @returns {boolean}
     * @async
     */
    async login({ commit }, payload) {
      try {
        await auth.signInWithEmailAndPassword(payload.email, payload.password);
        commit('toggleAuth');
      } catch (err) {
        Sentry.captureException(err);
      }
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
    /**
     * @description Get userRole
     * @method getUserRole
     * @returns {string}
     * @async
     */
    async getUserRole({ commit }) {
      const user = auth.currentUser;

      try {
        if (user) {
          const userRole = await usersCollection.doc(user.uid).get();
          const role = userRole.data().role;
          commit('setUserRole', role);
        }
      } catch (err) {
        Sentry.captureException(err);
      }
    },
    getCurrentUser({ commit }) {
      const user = auth.currentUser.uid;
      commit('setCurrentUser', user);
    },
    /**
     * @description Sends a reset password email
     * @method resetPassword
     * @returns {boolean}
     * @async
     */
    resetPassword(_, email) {
      try {
        auth.sendPasswordResetEmail(email).then((res) => {
          console.log(res);
        });
      } catch (err) {
        Sentry.captureException(err);
      }
    },
  },
  /**
   * @name Getters
   * @type {object}
   * @property {string} getUserRole - Access state userRole
   * @property {string} getCurrentUser - Access state currentUser
   */
  getters: {
    getUserRole(state) {
      return state.userRole;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
  },
};
