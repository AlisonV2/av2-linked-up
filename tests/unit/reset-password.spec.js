import { shallowMount } from '@vue/test-utils';
import ResetPassword from '@/views/ResetPassword.vue';
import ResetForm from '@/components/auth/ResetForm';

const config = {
  global: {
    components: {
      ResetForm,
    },
  },
};
/**
 * @module ResetPasswordPageTest
 */
describe('ResetPassword.vue', () => {
  it('ResetPasswordPage Snapshot', () => {
    const component = shallowMount(ResetPassword, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if ResetForm is rendered', () => {
    const component = shallowMount(ResetPassword, config);
    const geoloc = component.findComponent(ResetForm);
    expect(geoloc.exists()).toBe(true);
  });

});
