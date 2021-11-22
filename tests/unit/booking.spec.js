import { shallowMount } from '@vue/test-utils';
import Booking from '@/views/Booking.vue';
import BookingForm from '@/components/auth/BookingForm';

const $route = {
  params: { id: '1' },
};
const config = {
  data() {
    return {
      id: '1',
    };
  },
  global: {
    components: {
      BookingForm,
    },
    mocks: $route,
  },
};

/**
 * @module BookingPageTest
 */
describe('Booking.vue', () => {
  it('BookingPage Snapshot', () => {
    const component = shallowMount(Booking, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if BookingForm is rendered', () => {
    const component = shallowMount(Booking, config);
    const form = component.findComponent(BookingForm);
    expect(form.exists()).toBe(true);
  });
});
