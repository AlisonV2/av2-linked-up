import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ClientDashboard from '@/components/clients/ClientDashboard';
import AppTitle from '@/components/app/Title';

const actions = {
  getClientProfile: jest.fn(),
  setClientThumbnail: jest.fn(),
  setClientProfile: jest.fn(),
};

const state = {
  clientprofile: {
    clientProfile: {
      name: 'Alison',
      description: 'Unicorn power',
      city: 'Bordeaux',
      zip: '33800',
      tattooed: 'Yes',
      thumbnail: 'url',
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
        name: 'Alison',
        description: 'Unicorn power',
        city: 'Bordeaux',
        zip: '33800',
        tattooed: 'Yes',
        thumbnail: 'url',
      },
      showSuccessToast: false,
      showErrorToast: false,
      fileSelected: null,
      fileErr: null,
    };
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
 * @module ClientDashboardTest
 */
describe('ClientDashboard.vue', () => {
  it('ClientDashboard Snapshot', () => {
    const component = shallowMount(ClientDashboard, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if getClientProfile action is called', async () => {
    const component = shallowMount(ClientDashboard, config);
    ClientDashboard.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getClientProfile).toHaveBeenCalled;
  });

  it('Check if setClientProfile action is called', async () => {
    const component = shallowMount(ClientDashboard, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.setClientProfile).toHaveBeenCalled;
  });

  it('Check if setClientThumbnail action is called', async () => {
    const component = shallowMount(ClientDashboard, config);
    component.find('.thumbnail-button').trigger('click');
    await component.vm.$nextTick();
    expect(actions.setClientThumbnail).toHaveBeenCalled;
  });
});
