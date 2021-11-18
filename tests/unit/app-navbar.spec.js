import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import AppNavbar from '@/components/nav/Navbar.vue';

const state = {
    auth: {
      userLoggedIn: true,
    },
};

const actions = {
  logout: jest.fn(),
}
const store = createStore({
  state,
  actions,
});

const $router = {
  push: jest.fn(),
};

let $route = {
  meta: {
    requireAuth: true,
  },
  name: 'Home',
};

const userLoggedOut = {
  data() {
    return {
      isActive: false,
    };
  },
  global: {
    components: {
      'router-link': RouterLinkStub,
    },
    mocks: {
      $store: {
        state: {
          auth: {
            userLoggedIn: false,
          },
        },
      },
      $router,
      $route,
    },
  },
};

const userLoggedIn = {
  data() {
    return {
      isActive: false,
    };
  },
  global: {
    plugins: [store],
    components: {
      'router-link': RouterLinkStub,
    },
    mocks: {
      $router,
      $route,
    },
  },
};

const menuIsActive = {
  data() {
    return {
      isActive: true,
    };
  },
  global: {
    plugins: [store],
    components: {
      'router-link': RouterLinkStub,
    },
    mocks: {
      $router,
      $route,
    },
  },
};

/**
 * @module AppNavBarTest
 */
describe('AppNavbar.vue', () => {
  it('AppNavbar Snapshot', () => {
    const component = shallowMount(AppNavbar, userLoggedOut);
    expect(component.element).toMatchSnapshot();
  });

  it('Checks component name', () => {
    const component = shallowMount(AppNavbar, userLoggedOut);
    expect(component.vm.$options.name).toMatch('AppNavbar');
  });

  it('Login link should appear', () => {
    const component = shallowMount(AppNavbar, userLoggedOut);
    const loginLink = component.find('#login-link');
    expect(loginLink.exists()).toBe(true);
  });

  it('Logout link should not appear', () => {
    const component = shallowMount(AppNavbar, userLoggedOut);
    const logoutLink = component.find('#logout-link');
    expect(logoutLink.exists()).toBe(false);
  });

  it('Dashboard link should not appear', () => {
    const component = shallowMount(AppNavbar, userLoggedOut);
    const dashboardLink = component.find('#dashboard-link');
    expect(dashboardLink.exists()).toBe(false);
  });

  it('Dashboard link should appear', () => {
    const component = shallowMount(AppNavbar, userLoggedIn);
    const dashboardLink = component.find('#dashboard-link');
    expect(dashboardLink.exists()).toBe(true);
  });

  it('Logout link should appear', () => {
    const component = shallowMount(AppNavbar, userLoggedIn);
    const logoutLink = component.find('#logout-link');
    expect(logoutLink.exists()).toBe(true);
  });

  it('Logout action should be called', () => {
    const component = shallowMount(AppNavbar, userLoggedIn);
    const logoutLink = component.find('#logout-link');
    logoutLink.trigger('click');
    expect(actions.logout).toHaveBeenCalled;
  });

  it('Router push should be called', () => {
    const component = shallowMount(AppNavbar, userLoggedIn);
    const logoutLink = component.find('#logout-link');
    logoutLink.trigger('click');
    expect($router.push).toHaveBeenCalled;
  });

  it('Router push should not be called', () => {
    $route.meta.requireAuth = false;
    const component = shallowMount(AppNavbar, userLoggedIn);
    const logoutLink = component.find('#logout-link');
    logoutLink.trigger('click');
    expect($router.push).not.toHaveBeenCalled;
  });

  it('Login link should not appear', () => {
    const component = shallowMount(AppNavbar, userLoggedIn);
    const loginLink = component.find('#login-link');
    expect(loginLink.exists()).toBe(false);
  });

  it('Hamburger menu should be active', () => {
    const component = shallowMount(AppNavbar, menuIsActive);
    const activeMenu = component.find('#hamburger-menu');
    expect(activeMenu.classes()).toContain('active');
  });

  it('Hamburger menu should not be active', () => {
    const component = shallowMount(AppNavbar, userLoggedOut);
    const activeMenu = component.find('#hamburger-menu');
    expect(activeMenu.classes()).not.toContain('active');
  });
});
