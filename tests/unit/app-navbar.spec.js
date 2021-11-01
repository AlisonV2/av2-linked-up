import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import AppNavbar from '@/components/nav/Navbar.vue';

/**
 * @module AppNavBarTest
 */
describe('AppNavbar.vue', () => {
  /**
   * @name userLoggedOut
   * @type {object}
   * @param {function} data
   * @param {object} global
   */
  let userLoggedOut = {
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
      },
    },
  };

  /**
   * @name userLoggedIn
   * @type {object}
   * @param {function} data
   * @param {object} global
   */
  let userLoggedIn = {
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
              userLoggedIn: true,
            },
          },
        },
      },
    },
  };

  /**
   * @name menuIsActive
   * @type {object}
   * @param {function} data
   * @param {object} global
   */
  let menuIsActive = {
    data() {
      return {
        isActive: true,
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
              userLoggedIn: true,
            },
          },
        },
      },
    },
  };

  /**
   * Checks the component name
   */
  it('Checks component name', () => {
    const component = shallowMount(AppNavbar, userLoggedOut);
    expect(component.vm.$options.name).toMatch('AppNavbar');
  });

  /**
   * Login link should appear
   */
  it('Login link should appear', () => {
    const component = shallowMount(AppNavbar, userLoggedOut);
    const loginLink = component.find('#login-link');
    expect(loginLink.exists()).toBe(true);
  });

  /**
   * Logout link should not appear
   */
  it('Logout link should not appear', () => {
    const component = shallowMount(AppNavbar, userLoggedOut);
    const logoutLink = component.find('#logout-link');
    expect(logoutLink.exists()).toBe(false);
  });

  /**
   * Dashboard link should not appear
   */
  it('Dashboard link should not appear', () => {
    const component = shallowMount(AppNavbar, userLoggedOut);
    const dashboardLink = component.find('#dashboard-link');
    expect(dashboardLink.exists()).toBe(false);
  });

  /**
   * Dashboard link should appear
   */
  it('Dashboard link should appear', () => {
    const component = shallowMount(AppNavbar, userLoggedIn);
    const dashboardLink = component.find('#dashboard-link');
    expect(dashboardLink.exists()).toBe(true);
  });

  /**
   * Logout link should appear
   */
  it('Logout link should appear', () => {
    const component = shallowMount(AppNavbar, userLoggedIn);
    const logoutLink = component.find('#logout-link');
    expect(logoutLink.exists()).toBe(true);
  });

  /**
   * Login link should not appear
   */
  it('Login link should not appear', () => {
    const component = shallowMount(AppNavbar, userLoggedIn);
    const loginLink = component.find('#login-link');
    expect(loginLink.exists()).toBe(false);
  });

  /**
   * Hamburger menu should be active
   */
  it('Hamburger menu should be active', () => {
    const component = shallowMount(AppNavbar, menuIsActive);
    const activeMenu = component.find('#hamburger-menu');
    expect(activeMenu.classes()).toContain('active');
  });

  /**
   * Hamburger menu should not be active
   */
  it('Hamburger menu should not be active', () => {
    const component = shallowMount(AppNavbar, userLoggedOut);
    const activeMenu = component.find('#hamburger-menu');
    expect(activeMenu.classes()).not.toContain('active');
  });
});
