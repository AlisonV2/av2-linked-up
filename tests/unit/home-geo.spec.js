import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import HomeGeoloc from '@/components/home/Geoloc';
import AppTitle from '@/components/app/Title';
import AppButton from '@/components/app/Button';

const actions = {
  getArtistsByCity: jest.fn(),
};

const store = createStore({
  actions,
});

const $router = {
  push: jest.fn(),
};

const config = {
  global: {
    plugins: [store],
    stubs: {
      RouterLink: RouterLinkStub,
      'app-title': AppTitle,
      'app-button': AppButton,
    },
    mocks: {
      $router,
    },
  },
};

/**
 * @module HomeGeolocTest
 */
describe('HomeGeoloc.vue', () => {
  it('HomeGeoloc Snapshot', () => {
    const component = shallowMount(HomeGeoloc, config);
    expect(component.element).toMatchSnapshot();
  });

  it('handleSubmit should be called', async () => {
    const component = shallowMount(HomeGeoloc, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(component.emitted().handleSubmit).toHaveBeenCalled;
  });
});
