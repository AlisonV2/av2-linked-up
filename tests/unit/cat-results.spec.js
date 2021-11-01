import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import CategoriesResults from '@/views/CategoriesResults.vue';
import ArtistItem from '@/components/artists/ArtistItem';

/**
 * @module CategoriesResultsTest
 */
describe('CategoriesResults.vue', () => {
  /**
   * Checks if profile link is rendered
   */
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
    const component = shallowMount(CategoriesResults, {
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
                artists: artists,
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

  /**
   * Checks if back to home link is rendered
   */
  it('Back to home link should be rendered', () => {
    const component = shallowMount(CategoriesResults, {
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
                artists: [],
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
