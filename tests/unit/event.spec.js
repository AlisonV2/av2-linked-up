import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Event from '@/views/Event.vue';
import AppTitle from '@/components/app/Title';
import ArtistItem from '@/components/artists/ArtistItem';


const actions = {
  getEventById: jest.fn(),
  getUserRole: jest.fn(),
  getEventArtists: jest.fn(),
};

const getters = {
  getEventById: jest.fn(),
  getUserRole: jest.fn(),
  getEventArtists: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const $route = {
  params: { id: 1 },
};

const $router = {
  push: jest.fn(),
}

const config = {
  data() {
    return {
      event: {
        id: '',
        name: '',
        description: '',
        date: '',
        zip: '',
        city: '',
        thumbnail: '',
        attendees: [],
        stands: [],
      },
      role: '',
      artists: [],
    };
  },
  global: {
    plugins: [store],
    components: {
      'app-title': AppTitle,
      ArtistItem
    },
    mocks: {
      $route,
      $router
    },
  },
};

/**
 * @module EventTest
 */
describe('Event.vue', () => {
  it('Event Snapshot', () => {
    const component = shallowMount(Event, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getEventById action should have been called', async () => {
    const component = shallowMount(Event, config);
    Event.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getEventById).toHaveBeenCalled;
  });

  it('getEventById getter should have been called', async () => {
    const component = shallowMount(Event, config);
    Event.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getEventById).toHaveBeenCalled;
  });

  it('getEventById action should have been called', async () => {
    const component = shallowMount(Event, config);
    Event.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getEventById).toHaveBeenCalled;
  });

  it('getUserRole getter should have been called', async () => {
    const component = shallowMount(Event, config);
    Event.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getUserRole).toHaveBeenCalled;
  });

  it('getEventArtists action should have been called', async () => {
    const component = shallowMount(Event, config);
    Event.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getEventArtists).toHaveBeenCalled;
  });

  it('getEventArtists getter should have been called', async () => {
    const component = shallowMount(Event, config);
    Event.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getEventArtists).toHaveBeenCalled;
  });
});
