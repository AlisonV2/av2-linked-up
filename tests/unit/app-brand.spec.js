import { shallowMount } from '@vue/test-utils';
import AppBrand from '@/components/nav/Brand.vue';

describe('AppBrand.vue', () => {
  it('AppBrand Snapshot', () => {
    const component = shallowMount(AppBrand);
    expect(component.element).toMatchSnapshot();
  });

  it('Checks brand image class', () => {
    const component = shallowMount(AppBrand);
    expect(component.text()).toContain('Linked Up');
  });
});
