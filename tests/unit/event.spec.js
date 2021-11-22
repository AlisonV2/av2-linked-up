import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Event from '@/views/Event.vue';
import AppTitle from '@/components/app/Title';

const actions = {
  getEventById: jest.fn(),
  getUserRole: jest.fn(),
};

const getters = {
  getEventById: jest.fn(),
  getUserRole: jest.fn(),
};

const state = {
  auth: {
    userLoggedIn: true
  }
};

const store = createStore({
  state,
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
      },
      role: 'artist'
    };
  },
  global: {
    plugins: [store],
    components: {
      'app-title': AppTitle,
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
});
