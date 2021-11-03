import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import App from '@/App';
import AppNavbar from '@/components/nav/Navbar';
import AppFooter from '@/components/nav/Footer';
import AdminNav from '@/components/admin/AdminNav';
import 'lodash';

const actions = {
  initLogin: jest.fn(),
};

const store = createStore({
  actions,
});

const $router = {
  push: jest.fn(),
};

/**
 * @module AppTest
 */
describe('App.vue', () => {
  it('Renders child component via routing', () => {
    const component = shallowMount(App, {
      global: {
        plugins: [store],
        components: {
          AppNavbar,
          AppFooter,
          AdminNav,
        },
        stubs: ['router-view'],
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
    App.created.call(component.vm);
    expect(actions.initLogin).toHaveBeenCalled();
  });
  it('Renders child component via routing', () => {
    const component = shallowMount(App, {
      global: {
        plugins: [store],
        components: {
          AppNavbar,
          AppFooter,
          AdminNav,
        },
        stubs: ['router-view'],
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
    const adminNav = component.findComponent(AdminNav);
    expect(adminNav.exists()).toBe(true);
  });
});
