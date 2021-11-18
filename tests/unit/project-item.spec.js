import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ProjectItem from '@/components/admin/ProjectItem.vue';

const actions = {
  getUserRole: jest.fn(),
};

const getters = {
  getUserRole: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const clientConfig = {
  data() {
    return {
      role: 'client',
      status: 'Pending',
      project: {
          title: 'Title',
          artistName: 'Artist',
          clientName: 'Client',
          description: 'Description',
          createdAt: new Date().toString()
      },
      isArtist: false,
    };
  },
  global: {
    plugins: [store],
  },
};

/**
 * @module ProjectItemTest
 */
describe('ProjectItem.vue', () => {
  it('ProjectItem Snapshot', () => {
    const component = shallowMount(ProjectItem, clientConfig);
    expect(component.element).toMatchSnapshot();
  });

  it('getUserRole method should be called', async () => {
    const component = shallowMount(ProjectItem, clientConfig);
    ProjectItem.created.call(component.vm);
    await component.vm.$nextTick();
    expect(component.vm.getUserRole).toHaveBeenCalled;
  });

  it('getUserRole action should be called', async () => {
    const component = shallowMount(ProjectItem, clientConfig);
    ProjectItem.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getUserRole).toHaveBeenCalled;
  });

  it('getUserRole getter should be called', async () => {
    const component = shallowMount(ProjectItem, clientConfig);
    ProjectItem.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getUserRole).toHaveBeenCalled;
  });
});
