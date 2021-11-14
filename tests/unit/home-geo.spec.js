import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import HomeGeoloc from '@/components/home/Geoloc';
import AppTitle from '@/components/app/Title';
import AppButton from '@/components/app/Button';

const actions = {
  getArtistsByCity: jest.fn(),
  getGeoloc: jest.fn(),
};

const getters = {
  getGeoloc: jest.fn(),
};

const store = createStore({
  actions,
  getters
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

  it('getArtistsByCity should be called', async () => {
    const component = shallowMount(HomeGeoloc, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.getArtistsByCity).toHaveBeenCalled;
  });

  it('getGeoloc action should be called', async () => {
    const component = shallowMount(HomeGeoloc, config);
    component.find('.bi-geo-alt-fill').trigger('click');
    await component.vm.$nextTick();
    expect(actions.getGeoloc).toHaveBeenCalled;
  });

  it('getGeoloc getter should be called', async () => {
    const component = shallowMount(HomeGeoloc, config);
    component.find('.bi-geo-alt-fill').trigger('click');
    await component.vm.$nextTick();
    expect(getters.getGeoloc).toHaveBeenCalled;
  });
});
