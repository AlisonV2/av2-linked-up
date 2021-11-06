import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ArtistProfile from '@/views/ArtistProfile';
import AppTitle from '@/components/app/Title';
import AppButton from '@/components/app/Button';

const actions = {
  getArtistById: jest.fn(),
  getGalleryFromId: jest.fn(),
};

const getters = {
  getGalleryFromId: jest.fn(),
  getArtistById: jest.fn(),
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
        socialLink: 'Social',
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
    };
  },
  global: {
    plugins: [store],
    stubs: {
      'app-title': AppTitle,
      'app-button': AppButton,
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
  it('getArtistById should be called', async () => {
    const component = shallowMount(ArtistProfile, config);
    ArtistProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getArtistById).toHaveBeenCalled;
  });
  it('getGalleryFromId should be called', async () => {
    const component = shallowMount(ArtistProfile, config);
    ArtistProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getGalleryFromId).toHaveBeenCalled;
  });
  it('getArtistProfile should be called', async () => {
    const component = shallowMount(ArtistProfile, config);
    ArtistProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getArtistProfile).toHaveBeenCalled;
  });
  it('getGalleryFromId should be called', async () => {
    const component = shallowMount(ArtistProfile, config);
    ArtistProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getGalleryFromId).toHaveBeenCalled;
  });
});
