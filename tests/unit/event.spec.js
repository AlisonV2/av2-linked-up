import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Event from '@/views/Event.vue';
import AppTitle from '@/components/app/Title';

const actions = {
  getEventById: jest.fn(),
};

const getters = {
  getEventById: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const $route = {
  params: { id: 1 },
};

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
    };
  },
  global: {
    plugins: [store],
    components: {
      'app-title': AppTitle,
    },
    mocks: {
      $route,
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
