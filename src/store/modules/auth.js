import {
  auth,
  usersCollection,
  artistsCollection,
  clientsCollection,
  organizersCollection,
} from '@/utils/firebase';

export default {
  state: {
    userLoggedIn: false,
  },
  mutations: {
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
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
      console.log('User created!');
    },
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      console.log('Logged in!');

      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
    async logout({ commit }) {
      await auth.signOut();

      commit('toggleAuth');
    },
  },
};
