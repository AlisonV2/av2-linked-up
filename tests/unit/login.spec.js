import { shallowMount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import LoginForm from '@/components/auth/LoginForm.vue';

const config = {
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
  },
};

/**
 * @module LoginPageTest
 */
describe('Login.vue', () => {
  it('Loginpage Snapshot', () => {
    const component = shallowMount(Login, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Checks if LoginForm is rendered', () => {
    const component = shallowMount(Login, config);
    const loginForm = component.findComponent(LoginForm);
    expect(loginForm.exists()).toBe(true);
  });

  it('Checks if RegisterForm is not visible', () => {
    const component = shallowMount(Login, config);
    const registerForm = component.findComponent(RegisterForm);
    expect(registerForm.exists()).toBe(false);
  });

  it('Checks if LoginForm is not visible', () => {
    const component = shallowMount(Login, {
      ...config,
      data() {
        return {
          showLogin: false,
        };
      },
    });
    const loginForm = component.findComponent(LoginForm);
    expect(loginForm.exists()).toBe(false);
  });

  it('Checks if RegisterForm is visible', async () => {
    const component = shallowMount(Login, config);
    component.find('.show-signup').trigger('click');
    await component.vm.$nextTick();
    const registerForm = component.findComponent(RegisterForm);
    expect(registerForm.exists()).toBe(true);
  });
});
