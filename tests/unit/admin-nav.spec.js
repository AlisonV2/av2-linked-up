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

const config = {
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
};

/**
 * @module AdminNavTest
 */
describe('AdminNav.vue', () => {
  it('AdminNav Snapshot', () => {
    const component = shallowMount(AdminNav, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check requiresAuth check redirection', async () => {
    const component = shallowMount(AdminNav, config);
    component.find('.test-logout').trigger('click');
    await component.vm.$nextTick();
    expect($router.push).toHaveBeenCalled();
  });

  it('Check requiresAuth check redirection', async () => {
    const component = shallowMount(AdminNav, config);

    component.find('.test-logout').trigger('click');
    await component.vm.$nextTick();
    expect($router.push).toHaveBeenCalledWith({ name: 'Home' });
  });

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
});
