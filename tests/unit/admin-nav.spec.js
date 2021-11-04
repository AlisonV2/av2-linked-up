import { shallowMount } from '@vue/test-utils';
import AdminNav from '@/components/admin/AdminNav.vue';
import { createStore } from 'vuex';

const actions = {
  logout: jest.fn(),
};

const store = createStore({
  actions,
});

const $router = {
  push: jest.fn(),
};

/**
 * @module AdminNavTest
 */
describe('AdminNav.vue', () => {
  /**
   * Checks if logout action is called on click
   */
  it('Dispatch an action on click', async () => {
    const component = shallowMount(AdminNav, {
      data() {
        return {
          isActive: false,
        };
      },
      global: {
        plugins: [store],
        mocks: {
          $route: {
            meta: {
              requiresAuth: false,
            },
          },
          $router,
        },
      },
    });

    component.find('.test-logout').trigger('click');
    await component.vm.$nextTick();
    expect(actions.logout).toHaveBeenCalled();
  });

  /**
   * Checks if router push is called when meta requireAuth is true
   */
  it('Check requiresAuth check redirection', async () => {
    const component = shallowMount(AdminNav, {
      data() {
        return {
          isActive: false,
        };
      },
      global: {
        plugins: [store],
        mocks: {
          $route: {
            meta: {
              requiresAuth: true,
            },
          },
          $router,
        },
      },
    });

    component.find('.test-logout').trigger('click');
    await component.vm.$nextTick();
    expect($router.push).toHaveBeenCalled();
  });

  /**
   * Checks router params on push
   */
  it('Check requiresAuth check redirection', async () => {
    const component = shallowMount(AdminNav, {
      data() {
        return {
          isActive: false,
        };
      },
      global: {
        plugins: [store],
        mocks: {
          $route: {
            meta: {
              requiresAuth: true,
            },
          },
          $router,
        },
      },
    });

    component.find('.test-logout').trigger('click');
    await component.vm.$nextTick();
    expect($router.push).toHaveBeenCalledWith({ name: 'Home' });
  });
});
