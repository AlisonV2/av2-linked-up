import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import ClientEvents from '@/components/clients/ClientEvents.vue';
import EventItem from '@/components/organizers/EventItem';
import AppTitle from '@/components/app/Title';

const actions = {
  getClientEvents: jest.fn(),
};

const getters = {
  getClientEvents: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const $route = {
  name: 'Event',
  params: {
    id: '1'
  }
};

const config = {
  data() {
    return {
      events: [],
    };
  },
  global: {
    plugins: [store],
    components: {
      EventItem,
      AppTitle
    },
    stubs: {
      RouterLink: RouterLinkStub,
    },
    mocks: {
      $route
    }
  },
};

/**
 * @module ClientEventsTest
 */
describe('ClientEvents.vue', () => {
  it('ClientEvents Snapshot', () => {
    const component = shallowMount(ClientEvents, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if getClientEvents action is called', async () => {
    const component = shallowMount(ClientEvents, config);
    ClientEvents.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getClientEvents).toHaveBeenCalled;
  });

  it('Check if getClientEvents getter is called', async () => {
    const component = shallowMount(ClientEvents, config);
    ClientEvents.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getClientEvents).toHaveBeenCalled;
  });
});
