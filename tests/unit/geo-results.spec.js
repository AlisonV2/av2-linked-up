import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import GeoResults from '@/views/GeoResults.vue';
import ArtistItem from '@/components/artists/ArtistItem';

/**
 * @module GeoResultsTest
 */
describe('GeoResults.vue', () => {
  it('Profile link should be rendered', () => {
    const artists = [
      {
        id: '123',
        name: 'Dirty Jonz',
        shop: 'Le Dernier Rituel',
        city: 'Bègles',
        zip: '33130',
      },
    ];
    const component = shallowMount(GeoResults, {
      data() {
        return { artists: artists };
      },
      global: {
        components: {
          ArtistItem: ArtistItem,
          'router-link': RouterLinkStub,
        },
        mocks: {
          $store: {
            state: {
              search: {
                artistsByCity: artists,
              },
            },
          },
        },
      },
    });
    expect(component.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'Profile',
      params: { id: artists[0].id },
    });
  });

  it('Back to home link should be rendered', () => {
    const component = shallowMount(GeoResults, {
      data() {
        return { artists: [] };
      },
      global: {
        components: {
          ArtistItem: ArtistItem,
          'router-link': RouterLinkStub,
        },
        mocks: {
          $store: {
            state: {
              search: {
                artistsByCity: [],
              },
            },
          },
        },
      },
    });
    expect(component.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'Home',
    });
  });
});
