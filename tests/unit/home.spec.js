import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import HomeGeoloc from '@/components/home/Geoloc';
import HomeCategories from '@/components/home/Categories';

const config = {
  global: {
    components: {
      HomeCategories,
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

  it('Check if HomeCategories is rendered', () => {
    const component = shallowMount(Home, config);
    const categories = component.findComponent(HomeCategories);
    expect(categories.exists()).toBe(true);
  });
});
