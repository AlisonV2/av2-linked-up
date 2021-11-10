import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import ArtistItem from '@/components/artists/ArtistItem';

const artist = {
  id: 'mR9w90C9fMQfVHJWjGo1TrBxPuk1',
  name: 'Dirty Jonz',
  shop: 'Le Dernier Rituel',
  city: 'Bègles',
  zip: '33130',
};

const config = {
  propsData: {
    artist: artist,
  },
  globals: {
    components: {
      'router-link': RouterLinkStub,
    },
  },
};
/**
 * @module ArtistItemTest
 */
describe('ArtistItem.vue', () => {
  it('ArtistItem Snapshot', () => {
    const component = shallowMount(ArtistItem, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Should render true', () => {
    const component = shallowMount(ArtistItem, config);
    const artistName = component.find(
      '[data-test="mR9w90C9fMQfVHJWjGo1TrBxPuk1"]'
    );
    expect(artistName.text()).toBe(artist.name);
  });
});
