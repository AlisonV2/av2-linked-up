import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import ArtistEvents from '@/components/artists/ArtistEvents.vue';
import EventItem from '@/components/organizers/EventItem';

const actions = {
  getArtistEvents: jest.fn(),
};

const getters = {
  getArtistEvents: jest.fn(),
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
      attendance: [],
      stands: [],
    };
  },
  global: {
    plugins: [store],
    components: {
      EventItem,
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
 * @module ArtistEventsTest
 */
describe('ArtistEvents.vue', () => {
  it('ArtistEvents Snapshot', () => {
    const component = shallowMount(ArtistEvents, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if getArtistEvents action is called', async () => {
    const component = shallowMount(ArtistEvents, config);
    ArtistEvents.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getArtistEvents).toHaveBeenCalled;
  });

  it('Check if getArtistEvents getter is called', async () => {
    const component = shallowMount(ArtistEvents, config);
    ArtistEvents.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getArtistEvents).toHaveBeenCalled;
  });
});
