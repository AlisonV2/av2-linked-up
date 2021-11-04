import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import HomeGeoloc from '@/components/home/Geoloc';
import HomeCategories from '@/components/home/Categories';

/**
 * @module HomePageTest
 */
describe('HomeGeoloc.vue', () => {
  /**
   * Check if HomeGeoloc is rendered
   */
  it('Check if HomeGeoloc is rendered', () => {
    const component = shallowMount(Home, {
      global: {
        components: {
          HomeCategories,
          HomeGeoloc,
        },
      },
    });
    const geoloc = component.findComponent(HomeGeoloc);
    expect(geoloc.exists()).toBe(true);
  });

  /**
   * Check if HomeCategories is rendered
   */
  it('Check if HomeCategories is rendered', () => {
    const component = shallowMount(Home, {
      global: {
        components: {
          HomeCategories,
          HomeGeoloc,
        },
      },
    });
    const categories = component.findComponent(HomeCategories);
    expect(categories.exists()).toBe(true);
  });
});
