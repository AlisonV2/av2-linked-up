import { shallowMount } from '@vue/test-utils';
import Conventions from '@/views/Conventions.vue';
import AppTitle from '@/components/app/Title.vue';

const config = {
  global: {
    components: {
      'app-title': AppTitle,
    },
  },
};

/**
 * @module ConventionsPageTest
 */
describe('Conventions.vue', () => {
  it('Conventions Snapshot', () => {
    const component = shallowMount(Conventions, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if header is relevant', () => {
    const component = shallowMount(Conventions, config);
    const title = component.findComponent(AppTitle);
    expect(title.exists()).toBe(true);
  });
});
