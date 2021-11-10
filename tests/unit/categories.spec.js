import { shallowMount } from '@vue/test-utils';
import Categories from '@/views/Categories.vue';
import HomeCategories from '@/components/home/Categories';

const config = {
  global: {
    components: {
      HomeCategories,
    },
  },
};
/**
 * @module CategoriesPageTest
 */
describe('Categories.vue', () => {
  it('Categories Snapshot', () => {
    const component = shallowMount(Categories, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if CategoriesGeoloc is rendered', () => {
    const component = shallowMount(Categories, config);
    const cat = component.findComponent(HomeCategories);
    expect(cat.exists()).toBe(true);
  });
});
