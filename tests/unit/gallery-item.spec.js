import { shallowMount } from '@vue/test-utils';
import GalleryItem from '@/components/admin/GalleryItem';

/**
 * @module GalleryItemTest
 */
describe('GalleryItem.vue', () => {
  it('Checks if removeImg event is called', () => {
    const component = shallowMount(GalleryItem, {
      props: {
        image: 'https://via.placeholder.com/150',
        index: '1',
      },
    });
    component.find('.gallery-card').trigger('click');
    expect(component.emitted()).toHaveProperty('removeImg');
  });
});
