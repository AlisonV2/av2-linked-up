import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ClientDashboard from '@/components/clients/ClientDashboard';
import AppTitle from '@/components/app/Title';
import AppButton from '@/components/app/Button';


const actions = {
  getClientProfile: jest.fn(),
  setClientThumbnail: jest.fn(),
  setClientProfile: jest.fn(),
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
      'app-button': AppButton
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

  it('Check if getClientProfile getter is called', async () => {
    const component = shallowMount(ClientDashboard, config);
    ClientDashboard.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getClientProfile).toHaveBeenCalled;
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

  it('setPreviewImage should be called', () => {
    const component = shallowMount(ClientDashboard, config);
    const file = component.find('input[type="file"]');
    file.trigger('change');
    expect(component.vm.setPreviewImage).toHaveBeenCalled;
  });
});
