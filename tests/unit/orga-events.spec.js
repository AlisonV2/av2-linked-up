import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import OrgaEvents from '@/components/organizers/OrgaEvents.vue';
import EventUpdate from '@/components/admin/EventUpdate';
import AppButton from '@/components/app/Button';

const actions = {
  getOrgaEvents: jest.fn(),
};
const getters = {
  getOrgaEvents: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const $route = {
  name: 'EventDetails',
  params: { id: 1 },
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
      EventUpdate,
      'app-button': AppButton,
    },
    mocks: { 
      $route 
    },
    stubs: {
      RouterLink: RouterLinkStub,
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
    expect(actions.getOrgaEvents).toHaveBeenCalled;
  });

  it('getEvents getters should be called', async () => {
    const component = shallowMount(OrgaEvents, config);
    OrgaEvents.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getOrgaEvents).toHaveBeenCalled;
  });
});
