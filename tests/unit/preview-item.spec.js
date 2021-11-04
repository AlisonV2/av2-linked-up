import { shallowMount } from '@vue/test-utils';
import PreviewItem from '@/components/admin/PreviewItem';

/**
 * @module PreviewItemTest
 */
describe('PreviewItem.vue', () => {
  it('Checks if removePreview event is called', () => {
    const component = shallowMount(PreviewItem, {
      props: {
        image: 'https://via.placeholder.com/150',
        index: '1',
      },
    });
    component.find('.gallery-card').trigger('click');
    expect(component.emitted()).toHaveProperty('removePreview');
  });
});
