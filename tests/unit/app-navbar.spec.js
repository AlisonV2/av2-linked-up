import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import AppNavbar from '@/components/nav/Navbar.vue';

describe('AppNavbar.vue', () => {

  it('Checks component name', () => {
    const component = shallowMount(AppNavbar, {
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
    });
    expect(component.vm.$options.name).toMatch('AppNavbar');
  });

  it('Login link should appear', () => {
    const component = shallowMount(AppNavbar, {
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
    });
    const loginLink = component.find('#login-link');
    expect(loginLink.exists()).toBe(true);

  });

  it('Logout link should not appear', () => {
    const component = shallowMount(AppNavbar, {
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
    });

    const logoutLink = component.find('#logout-link');
    expect(logoutLink.exists()).toBe(false);
  });

  it('Dashboard link should not appear', () => {
    const component = shallowMount(AppNavbar, {
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
    });
    const dashboardLink = component.find('#dashboard-link');
    expect(dashboardLink.exists()).toBe(false);
  });

  it('Dashboard link should appear', () => {
    const component = shallowMount(AppNavbar, {
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
    });
    const dashboardLink = component.find('#dashboard-link');
    expect(dashboardLink.exists()).toBe(true);
  });

  it('Logout link should appear', () => {
    const component = shallowMount(AppNavbar, {
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
    });

    const logoutLink = component.find('#logout-link');
    expect(logoutLink.exists()).toBe(true);
  });

  it('Login link should not appear', () => {
    const component = shallowMount(AppNavbar, {
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
    });

    const loginLink = component.find('#login-link');
    expect(loginLink.exists()).toBe(false);
  });

  it('Hamburger menu should be active', () => {
    const component = shallowMount(AppNavbar, {
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
    });

    const activeMenu = component.find('#hamburger-menu');
    expect(activeMenu.classes()).toContain('active');
  });

  it('Hamburger menu should be active', () => {
    const component = shallowMount(AppNavbar, {
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
    });

    const activeMenu = component.find('#hamburger-menu');
    expect(activeMenu.classes()).not.toContain('active');
  });
});
