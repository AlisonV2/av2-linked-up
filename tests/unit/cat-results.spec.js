import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import CategoriesResults from '@/views/CategoriesResults.vue';
import ArtistItem from '@/components/artists/ArtistItem';

const artists = [
  {
    id: '123',
    name: 'Dirty Jonz',
    shop: 'Le Dernier Rituel',
    city: 'Bègles',
    zip: '33130',
  },
];

const config = {
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
};

/**
 * @module CategoriesResultsTest
 */
describe('CategoriesResults.vue', () => {
  it('Categories Snapshot', () => {
    const component = shallowMount(CategoriesResults, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Profile link should be rendered', () => {
    const component = shallowMount(CategoriesResults, config);
    expect(component.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'Profile',
      params: { id: artists[0].id },
    });
  });

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
