import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AdminGallery from '@/components/admin/AdminGallery';
import GalleryItem from '@/components/admin/GalleryItem';
import PreviewItem from '@/components/admin/PreviewItem';
import AppTitle from '@/components/app/Title';
import AppButton from '@/components/app/Button';

const actions = {
  getArtistGallery: jest.fn(),
  setArtistGallery: jest.fn(),
  updateArtistGallery: jest.fn(),
  deleteImage: jest.fn(),
};

const getters = {
  getProfileGallery: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

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
    plugins: [store],
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

  it('getArtistGallery action should have been called', async () => {
    const component = shallowMount(AdminGallery, config);
    AdminGallery.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getArtistGallery).toHaveBeenCalled;
  });

  it('getProfileGallery getter should have been called', async () => {
    const component = shallowMount(AdminGallery, config);
    AdminGallery.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getProfileGallery).toHaveBeenCalled;
  });
});
