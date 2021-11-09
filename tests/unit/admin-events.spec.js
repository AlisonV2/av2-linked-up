import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AdminEvents from '@/components/admin/AdminEvents.vue';
import ArtistEvents from '@/components/artists/ArtistEvents.vue';
import ClientEvents from '@/components/clients/ClientEvents.vue';

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
      ArtistEvents,
      ClientEvents,
    },
  },
};

/**
 * @module AdminEventsTest
 */
describe('AdminEvents.vue', () => {
  it('getUserRole action should have been called', async () => {
    const component = shallowMount(AdminEvents, config);
    AdminEvents.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getUserRole).toHaveBeenCalled;
  });
  it('getUserRole getter should have been called', async () => {
    const component = shallowMount(AdminEvents, config);
    AdminEvents.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getUserRole).toHaveBeenCalled;
  });
  it('ArtistEvents should exist', () => {
    const component = shallowMount(AdminEvents, config);
    const item = component.findComponent(ArtistEvents);
    expect(item.exists()).toBe(true);
  });
  it('ClientEvents should exist', () => {
    const component = shallowMount(AdminEvents, {
      ...config,
      data() {
        return {
          role: 'client',
        };
      },
    });
    const item = component.findComponent(ClientEvents);
    expect(item.exists()).toBe(true);
  });
});
