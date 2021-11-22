import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ManageAttendees from '@/components/organizers/ManageAttendees';

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

const config = {
  data() {
    return { 
        events: [], 
        attendees: null 
    };
  },
  global: {
    plugins: [store],
    components: {
      ManageAttendees,
    },
  },
};

/**
 * @module ManageAttendeesTest
 */
describe('ManageAttendees.vue', () => {
  it('ManageAttendees Snapshot', () => {
    const component = shallowMount(ManageAttendees, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getAllArtists action is called on created', () => {
    const component = shallowMount(ManageAttendees, config);
    ManageAttendees.created.call(component.vm);
    expect(actions.getOrgaEvents).toHaveBeenCalled();
  });

  it('getAllArtists getters is called on created', () => {
    const component = shallowMount(ManageAttendees, config);
    ManageAttendees.created.call(component.vm);
    expect(getters.getOrgaEvents).toHaveBeenCalled();
  });
});
