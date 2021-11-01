import { shallowMount } from '@vue/test-utils';
import AppBrand from '@/components/nav/Brand.vue';

describe('AppBrand.vue', () => {
  test('Checks brand image class', () => {
    const component = shallowMount(AppBrand);
    expect(component.classes()).toContain('navbar-brand');
  });
});
