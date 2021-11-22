import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ManageArtists from '@/components/organizers/ManageArtists';

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
      ManageArtists,
    },
  },
};

/**
 * @module ManageArtistsTest
 */
describe('ManageArtists.vue', () => {
  it('ManageArtists Snapshot', () => {
    const component = shallowMount(ManageArtists, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getAllArtists action is called on created', () => {
    const component = shallowMount(ManageArtists, config);
    ManageArtists.created.call(component.vm);
    expect(actions.getOrgaEvents).toHaveBeenCalled();
  });

  it('getAllArtists getters is called on created', () => {
    const component = shallowMount(ManageArtists, config);
    ManageArtists.created.call(component.vm);
    expect(getters.getOrgaEvents).toHaveBeenCalled();
  });
});
