import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ArtistDashboard from '@/components/artists/ArtistDashboard';
import AppTitle from '@/components/app/Title';

const actions = {
  getArtistProfile: jest.fn(),
  setArtistThumbnail: jest.fn(),
  setArtistProfile: jest.fn(),
};

const state = {
    artistProfile: {
    artistProfile: {
        name: '',
        city: '',
        zip: '',
        shop: '',
        style: '',
        socialLink: '',
        insta: '',
        description: '',
      },
  },
};

const store = createStore({
  state,
  actions,
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
      previewImage: null,
      profile: {
        name: '',
        city: '',
        zip: '',
        shop: '',
        style: '',
        socialLink: '',
        insta: '',
        description: '',
      },
      showSuccessToast: false,
      showErrorToast: false,
      fileSelected: null,
      fileErr: null,
    };
  },
  methods: {
      setPreviewImage: jest.fn(),
  },
  global: {
    plugins: [store],
    components: {
      'app-title': AppTitle,
    },
    mocks: {
      $router,
      $route,
    },
  },
};
/**
 * @module ArtistDashboardTest
 */
describe('ArtistDashboard.vue', () => {
  it('Check if getArtistProfile action is called', async () => {
    const component = shallowMount(ArtistDashboard, config);
    ArtistDashboard.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getArtistProfile).toHaveBeenCalled;
  });
  it('Check if setArtistProfile action is called', async () => {
    const component = shallowMount(ArtistDashboard, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.setArtistProfile).toHaveBeenCalled;
  });
  it('Check if setArtistThumbnail action is called', async () => {
    const component = shallowMount(ArtistDashboard, config);
    component.find('.thumbnail-button').trigger('click');
    await component.vm.$nextTick();
    expect(actions.setArtistThumbnail).toHaveBeenCalled;
  });
});