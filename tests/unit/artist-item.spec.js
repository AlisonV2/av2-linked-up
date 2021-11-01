import { shallowMount } from '@vue/test-utils';
import ArtistItem from '@/components/artists/ArtistItem';

describe('ArtistItem.vue', () => {
  it('Should render true', () => {
    const artist = {
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
    const artistName = component.find('[data-test="artist-name"]');
    expect(artistName.text()).toBe(artist.name);
  });
});
