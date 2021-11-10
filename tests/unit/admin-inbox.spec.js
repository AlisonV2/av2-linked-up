import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AdminInbox from '@/components/admin/AdminInbox.vue';
import ArtistInbox from '@/components/artists/ArtistInbox.vue';
import ClientInbox from '@/components/clients/ClientInbox.vue';

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
      ArtistInbox,
      ClientInbox,
    },
  },
};

/**
 * @module AdminInboxTest
 */
describe('AdminInbox.vue', () => {
  it('AdminInbox Snapshot', () => {
    const component = shallowMount(AdminInbox, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getUserRole action should have been called', async () => {
    const component = shallowMount(AdminInbox, config);
    AdminInbox.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getUserRole).toHaveBeenCalled;
  });

  it('getUserRole getter should have been called', async () => {
    const component = shallowMount(AdminInbox, config);
    AdminInbox.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getUserRole).toHaveBeenCalled;
  });

  it('ArtistInbox should exist', () => {
    const component = shallowMount(AdminInbox, config);
    const item = component.findComponent(ArtistInbox);
    expect(item.exists()).toBe(true);
  });

  it('ClientInbox should exist', () => {
    const component = shallowMount(AdminInbox, {
      ...config,
      data() {
        return {
          role: 'client',
        };
      },
    });
    const item = component.findComponent(ClientInbox);
    expect(item.exists()).toBe(true);
  });
});
