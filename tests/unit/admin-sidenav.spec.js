import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import Sidenav from '@/components/admin/Sidenav.vue';

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
      'router-link': RouterLinkStub,
    },
  },
};

/**
 * @module SidenavTest
 */
describe('Sidenav.vue', () => {
  it('getProjectById action should have been called', async () => {
    const component = shallowMount(Sidenav, config);
    Sidenav.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getUserRole).toHaveBeenCalled;
  });
  it('getUserRole getter should have been called', async () => {
    const component = shallowMount(Sidenav, config);
    Sidenav.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getUserRole).toHaveBeenCalled;
  });
});
