import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ResetForm from '@/components/auth/ResetForm.vue';
import AppTitle from '@/components/app/Title.vue';
import AppButton from '@/components/app/Button.vue';

let actions = {
  resetPassword: jest.fn(),
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
 * @module ResetFormTest
 */
describe('ResetForm.vue', () => {
  it('ResetForm Snapshot', () => {
    const component = shallowMount(ResetForm, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Dispatches resetPassword action on submit', async () => {
    const component = shallowMount(ResetForm, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.resetPassword).toHaveBeenCalled();
  });

  it('Expects router push to have been called with Login params', async () => {
    const component = shallowMount(ResetForm, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect($router.push).toHaveBeenCalledWith({ name: 'Login' });
  });

  it('Expects error message to be empty', () => {
    const component = shallowMount(ResetForm, config);
    const error = component.find('.error');
    expect(error.text()).toBeFalsy();
  });

  it('Checks if error message is correctly rendered', () => {
    let data = {
      email: '',
      error: 'Email is required',
    };
    const component = shallowMount(ResetForm, {
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
      resetPassword: () => {
        throw new Error('Error');
      },
    };
    const component = shallowMount(ResetForm, {
      data() {
        return {
          email: '',
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
    expect(actions.resetPassword).toThrow('Error');
  });
});
