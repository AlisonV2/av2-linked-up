import { shallowMount } from '@vue/test-utils';
import ArtistItem from '@/components/artists/ArtistItem';

describe('ArtistItem.vue', () => {
  it('Should render true', () => {
    const artist = {
      id: "mR9w90C9fMQfVHJWjGo1TrBxPuk1",
      name: 'Dirty Jonz',
      shop: 'Le Dernier Rituel',
      city: 'Bègles',
      zip: '33130',
    };
    const component = shallowMount(ArtistItem, {
      propsData: {
        artist: artist
      },
    });
    const artistName = component.find('[data-test="mR9w90C9fMQfVHJWjGo1TrBxPuk1"]');
    expect(artistName.text()).toBe(artist.name);
  });
});
