import { shallowMount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import LoginForm from '@/components/auth/LoginForm.vue';

/**
 * @module LoginPageTest
 */
describe('Login.vue', () => {
  /**
   * Check if LoginForm is rendered
   */
  it('Checks if LoginForm is rendered', () => {
    const component = shallowMount(Login, {
      data() {
        return {
          showLogin: true,
        };
      },
      global: {
        components: {
          RegisterForm,
          LoginForm,
        },
      }
    });
    const loginForm = component.findComponent(LoginForm);
    expect(loginForm.exists()).toBe(true);
  });

  /**
   * Checks if RegisterForm is not visible
   */
  it('Checks if RegisterForm is not visible', () => {
    const component = shallowMount(Login, {
      components: {
        RegisterForm,
        LoginForm,
      },
      data() {
        return {
          showLogin: true,
        };
      },
    });
    const registerForm = component.findComponent(RegisterForm);
    expect(registerForm.exists()).toBe(false);
  });

  /**
   * Checks if LoginForm is not visible
   */
  it('Checks if LoginForm is not visible', () => {
    const component = shallowMount(Login, {
      components: {
        RegisterForm,
        LoginForm,
      },
      data() {
        return {
          showLogin: false,
        };
      },
    });
    const loginForm = component.findComponent(LoginForm);
    expect(loginForm.exists()).toBe(false);
  });

  /**
   * Checks if RegisterForm is rendered on click
   */
  it('Checks if RegisterForm is visible', async () => {
    const component = shallowMount(Login, {
      components: {
        RegisterForm,
        LoginForm,
      },
      data() {
        return {
          showLogin: true,
        };
      },
    });
    component.find('.show-signup').trigger('click');
    await component.vm.$nextTick();
    const registerForm = component.findComponent(RegisterForm);
    expect(registerForm.exists()).toBe(true);
  });
});
