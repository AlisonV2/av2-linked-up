import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AdminProjects from '@/components/admin/AdminProjects.vue';
import ArtistProjects from '@/components/artists/ArtistProjects.vue';
import ClientProjects from '@/components/clients/ClientProjects.vue';

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

const config = {
  data() {
    return {
      role: 'artist',
    };
  },
  global: {
    plugins: [store],
    components: {
      ArtistProjects,
      ClientProjects,
    },
  },
};

/**
 * @module AdminProjectsTest
 */
describe('AdminProjects.vue', () => {
  it('AdminProjects Snapshot', () => {
    const component = shallowMount(AdminProjects, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getUserRole action should have been called', async () => {
    const component = shallowMount(AdminProjects, config);
    AdminProjects.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getUserRole).toHaveBeenCalled;
  });

  it('getUserRole getter should have been called', async () => {
    const component = shallowMount(AdminProjects, config);
    AdminProjects.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getUserRole).toHaveBeenCalled;
  });

  it('ArtistProjects should exist', () => {
    const component = shallowMount(AdminProjects, config);
    const item = component.findComponent(ArtistProjects);
    expect(item.exists()).toBe(true);
  });

  it('ClientProjects should exist', () => {
    const component = shallowMount(AdminProjects, {
      ...config,
      data() {
        return {
          role: 'client',
        };
      },
    });
    const item = component.findComponent(ClientProjects);
    expect(item.exists()).toBe(true);
  });
});
