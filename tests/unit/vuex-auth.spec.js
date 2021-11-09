import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import { cloneDeep } from 'lodash';

jest.mock('@/utils/firebase', () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve(),
    createUserWithEmailAndPassword: () => Promise.resolve(),
  },
}));

/**
 * @module AuthModuleTest
 */
describe('Vuex - Auth module', () => {
  it('toggleAuth mutation, sets userLoggedIn to true', () => {
    const clonedAuth = cloneDeep(auth);

    const store = createStore({
      modules: {
        auth: clonedAuth,
      },
    });

    expect(store.state.auth.userLoggedIn).not.toBe(true);
    store.commit('toggleAuth');
    expect(store.state.auth.userLoggedIn).toBe(true);
  });

  it('login action, sets userLoggedIn to true', async () => {
    const clonedAuth = cloneDeep(auth);

    const store = createStore({
      modules: {
        auth: clonedAuth,
      },
    });

    expect(store.state.auth.userLoggedIn).toBe(false);
    await store.dispatch('login', { email: '', password: '' });
    expect(store.state.auth.userLoggedIn).toBe(true);
  });
});
