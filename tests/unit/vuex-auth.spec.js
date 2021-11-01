import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import { cloneDeep } from 'lodash';

jest.mock('@/utils/firebase', () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve(),
  },
}));

describe('Vuex - Auth module', () => {
  /**
   * ToggleAuth mutation
   */
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

  /**
   * Login action
   */
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
