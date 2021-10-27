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
      //   const userCred = await auth.createUserWithEmailAndPassword(
      //     payload.email,
      //     payload.password
      //   );
      const userCred = {
        email: payload.email,
        password: payload.password,
      };
      console.log('User created', userCred.email);

      //   await usersCollection.doc(userCred.user.id).set({
      //     name: payload.name,
      //     email: payload.email,
      //   });

      //   await userCred.user.updateProfile({
      //     displayName: payload.name,
      //   });
      commit('toggleAuth');
    },
  },
  getters: {},
};
