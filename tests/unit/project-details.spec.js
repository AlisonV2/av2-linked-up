import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ProjectDetails from '@/components/admin/ProjectDetails.vue';

const actions = {
  getProjectById: jest.fn(),
  startChat: jest.fn(),
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
      showForm: false,
      message: '',
    };
  },
  global: {
    plugins: [store],
  },
};

/**
 * @module ProjectDetailsTest
 */
describe('ProjectDetails.vue', () => {
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
    const component = shallowMount(ProjectDetails, {
      ...config,
      data() {
        return {
          showForm: true,
        };
      },
    });
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.startChat).toHaveBeenCalled;
  });
});
