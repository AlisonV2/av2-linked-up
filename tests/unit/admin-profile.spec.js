import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AdminProfile from '@/components/admin/AdminProfile.vue';
import ArtistDashboard from '@/components/artists/ArtistDashboard.vue';
import ClientDashboard from '@/components/clients/ClientDashboard.vue';
import OrgaDashboard from '@/components/organizers/OrgaDashboard.vue';


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
      ArtistDashboard,
      ClientDashboard,
      OrgaDashboard,
    },
  },
};

/**
 * @module AdminProfileTest
 */
describe('AdminProfile.vue', () => {
  it('AdminProfile Snapshot', () => {
    const component = shallowMount(AdminProfile, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getUserRole action should have been called', async () => {
    const component = shallowMount(AdminProfile, config);
    AdminProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getUserRole).toHaveBeenCalled;
  });

  it('getUserRole getter should have been called', async () => {
    const component = shallowMount(AdminProfile, config);
    AdminProfile.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getUserRole).toHaveBeenCalled;
  });

  it('ArtistDashboard should exist', () => {
    const component = shallowMount(AdminProfile, config);
    const item = component.findComponent(ArtistDashboard);
    expect(item.exists()).toBe(true);
  });

  it('ClientDashboard should exist', () => {
    const component = shallowMount(AdminProfile, {
      ...config,
      data() {
        return {
          role: 'client',
        };
      },
    });
    const item = component.findComponent(ClientDashboard);
    expect(item.exists()).toBe(true);
  });

  it('ClientDashboard should exist', () => {
    const component = shallowMount(AdminProfile, {
      ...config,
      data() {
        return {
          role: 'organizer',
        };
      },
    });
    const item = component.findComponent(OrgaDashboard);
    expect(item.exists()).toBe(true);
  });
});
