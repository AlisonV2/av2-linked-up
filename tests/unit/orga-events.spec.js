import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import OrgaEvents from '@/components/organizers/OrgaEvents.vue';
import EventItem from '@/components/admin/EventItem';
import AppButton from '@/components/app/Button';

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
    return {
      events: [],
    };
  },
  global: {
    plugins: [store],
    components: {
      EventItem,
      'app-button': AppButton,
    },
  },
};

/**
 * @module OrgaEventsTest
 */
describe('OrgaEvents.vue', () => {
  it('OrgaEvents Snapshot', () => {
    const component = shallowMount(OrgaEvents, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getEvents action should be called', async () => {
    const component = shallowMount(OrgaEvents, config);
    OrgaEvents.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getEvents).toHaveBeenCalled;
  });

  it('getEvents getters should be called', async () => {
    const component = shallowMount(OrgaEvents, config);
    OrgaEvents.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getEvents).toHaveBeenCalled;
  });
});
