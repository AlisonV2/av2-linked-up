import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import ProjectDetails from '@/components/admin/ProjectDetails.vue';
import AppButton from '@/components/app/Button';

const actions = {
  getProjectById: jest.fn(),
  startChat: jest.fn(),
  setProjectStatus: jest.fn(),
};

const getters = {
  getProjectById: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const $route = {
  name: 'ClientProfile',
  params: { id: 1 },
};

const config = {
  data() {
    return {
      project: {
        artistId: '',
        artistName: '',
        clientId: '',
        clientName: '',
        createdAt: '',
        description: '',
        id: '',
        title: '',
        status: 'Pending',
      },
      showForm: true,
      message: '',
      isArtist: true,
    }
  },
  global: {
    plugins: [store],
    components: {
      'app-button': AppButton,
    },
    stubs: {
      RouterLink: RouterLinkStub,
    },
    mocks: {
      $route,
    },
  },
};

/**
 * @module ProjectDetailsTest
 */
describe('ProjectDetails.vue', () => {
  it('ProjectDetails Snapshot', () => {
    const component = shallowMount(ProjectDetails, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getProjectById action should have been called', async () => {
    const component = shallowMount(ProjectDetails, config);
    ProjectDetails.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getProjectById).toHaveBeenCalled;
  });

  it('getProjectById getter should have been called', async () => {
    const component = shallowMount(ProjectDetails, config);
    ProjectDetails.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getProjectById).toHaveBeenCalled;
  });
});
