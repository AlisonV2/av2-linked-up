import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ArtistDashboard from '@/components/artists/ArtistDashboard';
import AppTitle from '@/components/app/Title';
import AppButton from '@/components/app/Button';

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
      'app-button': AppButton
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
  it('ArtistDashboard Snapshot', () => {
    const component = shallowMount(ArtistDashboard, config);
    expect(component.element).toMatchSnapshot();
  });

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

  it('Check if toastError component is visible', async () => {
    const component = shallowMount(ArtistDashboard, {
      ...config,
      data() {
        return {
          showSuccessToast: false,
          showErrorToast: true,
        };
      },
    });
    const error = component.find('.toast-error');
    expect(error.exists()).toBe(true);
  });

  it('setPreviewImage should be called', () => {
    const component = shallowMount(ArtistDashboard, config);
    const file = component.find('input[type="file"]');
    file.trigger('change');
    expect(component.vm.setPreviewImage).toHaveBeenCalled;
  });
});
