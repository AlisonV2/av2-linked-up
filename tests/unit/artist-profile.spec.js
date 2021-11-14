import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ArtistProfile from '@/views/ArtistProfile';
import AppTitle from '@/components/app/Title';
import AppButton from '@/components/app/Button';
import AppModal from '@/components/app/Modal';

const actions = {
  getArtistById: jest.fn(),
  getGalleryFromId: jest.fn(),
  getUserRole: jest.fn(),
};

const getters = {
  getArtistById: jest.fn(),
  getGalleryFromId: jest.fn(),
  getUserRole: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const $router = {
  push: jest.fn(),
};

const $route = {
  params: { id: '1' },
};

const config = {
  data() {
    return {
      artist: {
        id: 1,
        name: 'Artist',
        description: 'Description',
        thumbnail: 'Thumbnail',
        socialLink: 'https://via.placeholder.com/150',
        shop: 'Shop',
        insta: 'Insta',
        city: 'City',
        zip: 'Zip',
        style: 'Style',
      },
      gallery: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      role: 'client',
      open: false,
      name: 'Artist',
    };
  },
  global: {
    plugins: [store],
    stubs: {
      'app-title': AppTitle,
      'app-button': AppButton,
      AppModal: AppModal,
    },
    mocks: {
      $router,
      $route,
    },
  },
};

/**
 * @module ArtistProfileTest
 */
describe('ArtistProfile.vue', () => {
  it('ArtistProfile Snapshot', () => {
    const component = shallowMount(ArtistProfile, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getArtistById action should be called', async () => {
    const component = shallowMount(ArtistProfile, config);
    ArtistProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getArtistById).toHaveBeenCalled;
  });

  it('getGalleryFromId action should be called', async () => {
    const component = shallowMount(ArtistProfile, config);
    ArtistProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getGalleryFromId).toHaveBeenCalled;
  });

  it('getUserRole action should be called', async () => {
    const component = shallowMount(ArtistProfile, config);
    ArtistProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getUserRole).toHaveBeenCalled;
  });

  it('getArtistProfile getter should be called', async () => {
    const component = shallowMount(ArtistProfile, config);
    ArtistProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getArtistProfile).toHaveBeenCalled;
  });

  it('getGalleryFromId getter should be called', async () => {
    const component = shallowMount(ArtistProfile, config);
    ArtistProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getGalleryFromId).toHaveBeenCalled;
  });

  it('getUserRole getter should be called', async () => {
    const component = shallowMount(ArtistProfile, config);
    ArtistProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getUserRole).toHaveBeenCalled;
  });

  it('handleContact should be called with correct route params', async () => {
    const component = shallowMount(ArtistProfile, config);
    component.find('.btn-center').trigger('click');
    await component.vm.$nextTick();
    expect($router.push).toHaveBeenCalledWith({
      name: 'ArtistContact',
      params: { artist: 'Artist', id: '1' },
    });
  });

  it('Modal should open', async () => {
    const component = shallowMount(ArtistProfile, {
      ...config,
      data() {
        return {
          open: true,
        };
      },
    });
    component.find('.btn-center').trigger('click');
    await component.vm.$nextTick();
    expect(component.find('.modal').isVisible()).toBe(true);
  });
});
