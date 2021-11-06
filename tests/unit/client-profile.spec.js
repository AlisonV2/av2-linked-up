import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ClientProfile from '@/views/ClientProfile';
import AppTitle from '@/components/app/Title';
import AppButton from '@/components/app/Button';

const actions = {
  getClientById: jest.fn(),
};

const getters = {
    getClientProfile: jest.fn(),
}

const store = createStore({
  actions,
  getters
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
      client: {
        id: 1,
        name: 'Client',
        description: 'Description',
        thumbnail: 'Thumbnail',
        city: 'City',
        zip: 'Zip',
        tattooed: 'yes',
      },
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
 * @module ClientProfileTest
 */
describe('ClientProfile.vue', () => {
  it('getClientById should be called', async () => {
    const component = shallowMount(ClientProfile, config);
    ClientProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getClientById).toHaveBeenCalled;
  });
  it('Computed client should call getters', async () => {
    const component = shallowMount(ClientProfile, config);
    ClientProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getClientProfile).toHaveBeenCalled;
  });
});
