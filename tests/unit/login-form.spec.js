import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import LoginForm from '@/components/auth/LoginForm.vue';
import AppTitle from '@/components/app/Title.vue';
import AppButton from '@/components/app/Button.vue';

let actions = {
  login: jest.fn(),
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
      email: 'test@test.com',
      password: 'test123',
      error: null,
    };
  },
  global: {
    plugins: [store],
    mocks: {
      $router,
    },
    components: {
      'app-title': AppTitle,
      'app-button': AppButton,
    },
  },
};

/**
 * @module LoginFormTest
 */
describe('LoginForm.vue', () => {
  it('LoginForm Snapshot', () => {
    const component = shallowMount(LoginForm, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Dispatches "login" action on submit', async () => {
    const component = shallowMount(LoginForm, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.login).toHaveBeenCalled();
  });

  it('Expects router push to have been called with AdminProfile params', async () => {
    const component = shallowMount(LoginForm, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect($router.push).toHaveBeenCalledWith({ name: 'AdminProfile' });
  });

  it('Expects error message to be empty', () => {
    const component = shallowMount(LoginForm, config);
    const error = component.find('.error');
    expect(error.text()).toBeFalsy();
  });

  it('Checks if error message is correctly rendered', () => {
    let data = {
      email: '',
      password: '',
      error: 'Email and password are required',
    };
    const component = shallowMount(LoginForm, {
      ...config,
      data() {
        return data;
      },
    });
    const error = component.find('.error');
    expect(error.text()).toBe(data.error);
  });

  it('Expects an error to be thrown', async () => {
    actions = {
      login: () => {
        throw new Error('Error');
      },
    };
    const component = shallowMount(LoginForm, {
      data() {
        return {
          email: '',
          password: '',
          error: null,
        };
      },
      global: {
        plugins: [store],
        mocks: {
          $router,
        },
        components: {
          'app-title': AppTitle,
          'app-button': AppButton,
        },
      },
    });
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.login).toThrow('Error');
  });
});
