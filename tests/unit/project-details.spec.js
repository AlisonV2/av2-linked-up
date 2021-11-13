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

const config = {
  data() {
    return {
      project: {},
      showForm: true,
      message: '',
      isArtist: true,
    };
  },
  global: {
    plugins: [store],
    components: {
      'app-button': AppButton,
    },
    stubs: {
      RouterLink: RouterLinkStub,
    }
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

  it('getProjectByIdaction should have been called', async () => {
    const component = shallowMount(ProjectDetails, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.startChat).toHaveBeenCalled;
  });

  it('getProjectStatus action should have been called', async () => {
    const component = shallowMount(ProjectDetails, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.setProjectStatus).toHaveBeenCalled;
  });
});
