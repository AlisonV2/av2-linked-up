import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import HomeGeoloc from '@/components/home/Geoloc';

const config = {
  global: {
    components: {
      HomeGeoloc,
    },
  },
};
/**
 * @module HomePageTest
 */
describe('Home.vue', () => {
  it('HomePage Snapshot', () => {
    const component = shallowMount(Home, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if HomeGeoloc is rendered', () => {
    const component = shallowMount(Home, config);
    const geoloc = component.findComponent(HomeGeoloc);
    expect(geoloc.exists()).toBe(true);
  });

});
