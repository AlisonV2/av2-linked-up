import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import ArtistList from '@/components/artists/ArtistList';
import ArtistItem from '@/components/artists/ArtistItem';

const actions = {
  getAllArtists: jest.fn(),
};

const getters = {
  getAllArtists: jest.fn(),
};
const store = createStore({
  actions,
  getters,
});

const config = {
  data() {
    return { artists: [] };
  },
  global: {
    plugins: [store],
    components: {
      'router-link': RouterLinkStub,
      ArtistItem: ArtistItem,
    },
  },
};

/**
 * @module ArtistListTest
 */
describe('ArtistList.vue', () => {
  it('ArtistList Snapshot', () => {
    const component = shallowMount(ArtistList, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getAllArtists action is called on created', () => {
    const component = shallowMount(ArtistList, config);
    ArtistList.created.call(component.vm);
    expect(actions.getAllArtists).toHaveBeenCalled();
  });

  it('getAllArtists getters is called on created', () => {
    const component = shallowMount(ArtistList, config);
    ArtistList.created.call(component.vm);
    expect(getters.getAllArtists).toHaveBeenCalled();
  });
});
