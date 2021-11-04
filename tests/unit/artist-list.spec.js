import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import ArtistList from '@/components/artists/ArtistList';
import ArtistItem from '@/components/artists/ArtistItem';

const actions = {
    getAllArtists: jest.fn(),
}
const store = createStore({
  state: {
    artists: [
      {
        id: 'mR9w90C9fMQfVHJWjGo1TrBxPuk1',
        name: 'Dirty Jonz',
        shop: 'Le Dernier Rituel',
        city: 'Bègles',
        zip: '33130',
      },
    ],
  },
  actions,
  getters: {
    getAllArtists(state) {
      return state.artists;
    },
  },
});

/**
 * @module ArtistListTest
 */
describe('ArtistList.vue', () => {
  it('Tests if dispatch action is called on created', () => {
    const component = shallowMount(ArtistList, {
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
    });
    ArtistList.created.call(component.vm);
    expect(actions.getAllArtists).toHaveBeenCalled();
  });
});
