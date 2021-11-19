import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import EventItem from '@/components/admin/EventItem.vue';

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
      role: 'organizer',
      event: { 
          name: '',
          orgaName: '',
          description: '',
          localisation: '',
          date: ''
      }
    };
  },
  global: {
    plugins: [store],
  },
};

/**
 * @module EventItemTest
 */
describe('EventItem.vue', () => {
  it('getUserRole method should be called', async () => {
    const component = shallowMount(EventItem, config);
    EventItem.created.call(component.vm);
    await component.vm.$nextTick();
    expect(component.vm.getUserRole).toHaveBeenCalled;
  });

  it('getUserRole action should be called', async () => {
    const component = shallowMount(EventItem, config);
    EventItem.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getUserRole).toHaveBeenCalled;
  });

  it('getUserRole getter should be called', async () => {
    const component = shallowMount(EventItem, config);
    EventItem.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getUserRole).toHaveBeenCalled;
  });
});
