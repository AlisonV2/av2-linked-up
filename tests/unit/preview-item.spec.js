import { shallowMount } from '@vue/test-utils';
import PreviewItem from '@/components/admin/PreviewItem';

const config = {
  props: {
    image: 'https://via.placeholder.com/150',
    index: '1',
  },
};

/**
 * @module PreviewItemTest
 */
describe('PreviewItem.vue', () => {
  it('PreviewItem Snapshot', () => {
    const component = shallowMount(PreviewItem, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Checks if removePreview event is called', () => {
    const component = shallowMount(PreviewItem, config);
    component.find('.gallery-card').trigger('click');
    expect(component.emitted()).toHaveProperty('removePreview');
  });
});
