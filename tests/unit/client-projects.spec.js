import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ClientProjects from '@/components/clients/ClientProjects.vue';
import ProjectItem from '@/components/admin/ProjectItem.vue';

const actions = {
  getClientProjects: jest.fn(),
};

const getters = {
  getClientProjects: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const config = {
  data() {
    return {
      projects: [],
    };
  },
  global: {
    plugins: [store],
    components: {
        ProjectItem,
    }
  },
};

/**
 * @module ClientProjectsTest
 */
describe('ClientProjects.vue', () => {
  it('ClientProjects Snapshot', () => {
    const component = shallowMount(ClientProjects, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if getClientProjects action is called', async () => {
    const component = shallowMount(ClientProjects, config);
    ClientProjects.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getClientProjects).toHaveBeenCalled;
  });

  it('Check if getClientProjects getter is called', async () => {
    const component = shallowMount(ClientProjects, config);
    ClientProjects.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getClientProjects).toHaveBeenCalled;
  });
});
