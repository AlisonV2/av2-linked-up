import { shallowMount } from '@vue/test-utils';
import Conventions from '@/views/Conventions.vue';
import AppTitle from '@/components/app/Title.vue'

/**
 * @module ConventionsPageTest
 */
describe('Conventions.vue', () => {
  it('Check if header is relevant', () => {
    const component = shallowMount(Conventions, {
      global: {
        components: {
          'app-title': AppTitle,
        },
      },
    });
    const title = component.findComponent(AppTitle);
    expect(title.exists()).toBe(true);
  });
});
