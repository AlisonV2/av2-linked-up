import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import BookingForm from '@/components/auth/BookingForm.vue';
import AppTitle from '@/components/app/Title.vue';
import AppButton from '@/components/app/Button.vue';

let actions = {
  setBooking: jest.fn(),
};

const store = createStore({
  actions,
});

const $router = {
  push: jest.fn(),
};

const $route = {
  name: 'AdminEvents',
};

const config = {
  data() {
    return {
      tickets: 2,
      error: null,
      id: '1'
    };
  },
  global: {
    plugins: [store],
    mocks: {
      $router,
      $route,
    },
    components: {
      'app-title': AppTitle,
      'app-button': AppButton,
    },
  },
};

/**
 * @module BookingFormTest
 */
describe('BookingForm.vue', () => {
  it('BookingForm Snapshot', () => {
    const component = shallowMount(BookingForm, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Dispatches setBooking action on submit', async () => {
    const component = shallowMount(BookingForm, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.setBooking).toHaveBeenCalled;
  });

  it('Expects router push to have been called with AdminEvents params', async () => {
    const component = shallowMount(BookingForm, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect($router.push).toHaveBeenCalled;
  });
});
