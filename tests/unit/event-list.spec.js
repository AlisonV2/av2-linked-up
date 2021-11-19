import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import EventList from '@/components/organizers/EventList';
import EventItem from '@/components/organizers/EventItem';

const actions = {
  getEvents: jest.fn(),
};

const getters = {
  getEvents: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const config = {
  data() {
    return { events: [] };
  },
  global: {
    plugins: [store],
    components: {
      'router-link': RouterLinkStub,
      EventItem: EventItem,
    },
  },
};

/**
 * @module EventListTest
 */
describe('EventList.vue', () => {
  it('EventList Snapshot', () => {
    const component = shallowMount(EventList, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getEvents action is called on created', () => {
    const component = shallowMount(EventList, config);
    EventList.created.call(component.vm);
    expect(actions.getEvents).toHaveBeenCalled();
  });

  it('getEvents getter is called on created', () => {
    const component = shallowMount(EventList, config);
    EventList.created.call(component.vm);
    expect(getters.getEvents).toHaveBeenCalled();
  });
});
