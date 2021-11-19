import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import OrgaDashboard from '@/components/organizers/OrgaDashboard';
import AppTitle from '@/components/app/Title';
import AppButton from '@/components/app/Button';


const actions = {
  getOrgaProfile: jest.fn(),
  setOrgaThumbnail: jest.fn(),
  setOrgaProfile: jest.fn(),
};

const state = {
  Orgaprofile: {
    OrgaProfile: {
      name: 'Alison',
      city: 'Bordeaux',
      zip: '33800',
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
      'app-button': AppButton
    },
    mocks: {
      $router,
      $route,
    },
  },
};
/**
 * @module OrgaDashboardTest
 */
describe('OrgaDashboard.vue', () => {
  it('OrgaDashboard Snapshot', () => {
    const component = shallowMount(OrgaDashboard, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if getOrgaProfile action is called', async () => {
    const component = shallowMount(OrgaDashboard, config);
    OrgaDashboard.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getOrgaProfile).toHaveBeenCalled;
  });

  it('Check if setOrgaProfile action is called', async () => {
    const component = shallowMount(OrgaDashboard, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.setOrgaProfile).toHaveBeenCalled;
  });

  it('Check if setOrgaThumbnail action is called', async () => {
    const component = shallowMount(OrgaDashboard, config);
    component.find('.thumbnail-button').trigger('click');
    await component.vm.$nextTick();
    expect(actions.setOrgaThumbnail).toHaveBeenCalled;
  });

  it('setPreviewImage should be called', () => {
    const component = shallowMount(OrgaDashboard, config);
    const file = component.find('input[type="file"]');
    file.trigger('change');
    expect(component.vm.setPreviewImage).toHaveBeenCalled;
  });
});
