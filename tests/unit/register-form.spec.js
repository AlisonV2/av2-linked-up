import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import AppTitle from '@/components/app/Title.vue';
import AppButton from '@/components/app/Button.vue';

let actions = {
  register: jest.fn(),
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
      name: 'Test',
      email: 'test@test.com',
      password: 'test123',
      role: 'artist',
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
 * @module RegisterFormTest
 */
describe('RegisterForm.vue', () => {
  it('RegisterForm Snapshot', () => {
    const component = shallowMount(RegisterForm, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Dispatches "register" action on submit', async () => {
    const component = shallowMount(RegisterForm, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.register).toHaveBeenCalled();
  });

  it('Expects router push to have been called with AdminProfile params', async () => {
    const component = shallowMount(RegisterForm, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect($router.push).toHaveBeenCalledWith({ name: 'AdminProfile' });
  });

  it('Expects error message to be empty', () => {
    const component = shallowMount(RegisterForm, config);
    const error = component.find('.error');
    expect(error.text()).toBeFalsy();
  });

  it('Checks if error message is correctly rendered', () => {
    let data = {
      email: '',
      password: '',
      error: 'Email and password are required',
    };
    const component = shallowMount(RegisterForm, {
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
      register: () => {
        throw new Error('Error');
      },
    };
    const component = shallowMount(RegisterForm, {
      ...config,
      data() {
        return {
          name: '',
          email: '',
          password: '',
          role: '',
          error: null,
        };
      },
    });
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.register).toThrow('Error');
  });
});
