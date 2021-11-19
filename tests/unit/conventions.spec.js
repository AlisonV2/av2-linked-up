import { shallowMount } from '@vue/test-utils';
import Conventions from '@/views/Conventions.vue';
import AppTitle from '@/components/app/Title.vue';
import EventList from '@/components/organizers/EventList';

const config = {
  global: {
    components: {
      EventList,
      'app-title': AppTitle,
    },
  },
};

/**
 * @module ConventionPageTest
 */
describe('Conventions.vue', () => {
  it('Conventions Snapshot', () => {
    const component = shallowMount(Conventions, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if EventList is rendered', () => {
    const component = shallowMount(Conventions, config);
    const conventions = component.findComponent(EventList);
    expect(conventions.exists()).toBe(true);
  });
});
