import { shallowMount } from '@vue/test-utils';
import AdminGallery from '@/components/admin/AdminGallery';
import GalleryItem from '@/components/admin/GalleryItem';
import PreviewItem from '@/components/admin/PreviewItem';
import AppTitle from '@/components/app/Title';
import AppButton from '@/components/app/Button';

const config = {
  data() {
    return {
      images: [],
      gallery: [],
      profileGallery: [],
      showSuccessToast: false,
      showErrorToast: false,
    };
  },
  global: {
    components: {
      GalleryItem,
      PreviewItem,
      'app-title': AppTitle,
      'app-button': AppButton,
    },
  },
};

/**
 * @module AdminGalleryTest
 */
describe('AdminGallery.vue', () => {
  it('AdminGallery Snapshot', () => {
    const component = shallowMount(AdminGallery, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Toast Success should not be visible', () => {
    const component = shallowMount(AdminGallery, config);
    expect(component.find('.toast-success')).not.toBeVisible;
  });

  it('Toast Error should not be visible', () => {
    const component = shallowMount(AdminGallery, config);
    expect(component.find('.toast-error')).not.toBeVisible;
  });
});
