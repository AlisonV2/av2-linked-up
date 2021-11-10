import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import App from '@/App';
import AppNavbar from '@/components/nav/Navbar';
import AppFooter from '@/components/nav/Footer';
import AdminNav from '@/components/admin/AdminNav';
import AppModal from '@/components/app/Modal';
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

const config = {
  data() {
    return {
      open: false,
    };
  },
  global: {
    plugins: [store],
    components: {
      AppNavbar,
      AppFooter,
      AdminNav,
      AppModal,
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
};

/**
 * @module AppTest
 */
describe('App.vue', () => {
  it('ArtistInbox Snapshot', () => {
    const component = shallowMount(App, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Renders child component via routing', () => {
    const component = shallowMount(App, {
      data() {
        return {
          open: false,
        };
      },
      global: {
        plugins: [store],
        components: {
          AppNavbar,
          AppFooter,
          AdminNav,
          AppModal,
        },
        stubs: ['router-view'],
        mocks: {
          $route: {
            meta: {
              requiresAuth: false,
            },
          },
          $router,
          methods: {
            getEgg: jest.fn(),
          },
        },
      },
    });
    App.created.call(component.vm);
    expect(actions.initLogin).toHaveBeenCalled();
  });

  it('Renders child component via routing', () => {
    const component = shallowMount(App, config);
    const adminNav = component.findComponent(AdminNav);
    expect(adminNav.exists()).toBe(true);
  });

  it('Modal is not visible', () => {
    const component = shallowMount(App, config);
    const modal = component.findComponent(AppModal);
    expect(modal).not.toBeVisible;
  });

  it('getEgg is triggered', () => {
    const component = shallowMount(App, config);
    component.get('.easter-egg').trigger('mouseover', {
      ctrlKey: true,
    });
    expect(component.vm.open).toBe(true);
  });
});
