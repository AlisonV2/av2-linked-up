import { shallowMount } from '@vue/test-utils';
import Categories from '@/views/Categories.vue';
import HomeCategories from '@/components/home/Categories';

/**
 * @module CategoriesPageTest
 */
describe('Categories.vue', () => {
  it('Check if CategoriesGeoloc is rendered', () => {
    const component = shallowMount(Categories, {
      global: {
        components: {
          HomeCategories,
        },
      },
    });
    const cat = component.findComponent(HomeCategories);
    expect(cat.exists()).toBe(true);
  });
});
