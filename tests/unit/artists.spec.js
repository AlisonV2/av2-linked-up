import { shallowMount } from '@vue/test-utils';
import Artists from '@/views/Artists.vue';
import ArtistList from '@/components/artists/ArtistList.vue';
import AppTitle from '@/components/app/Title.vue';

/**
 * @module ArtistPageTest
 */
describe('Artists.vue', () => {
  /**
   * Check if ArtistList is rendered
   */
  it('Check if ArtistList is rendered', () => {
    const component = shallowMount(Artists, {
      global: {
        components: {
          ArtistList,
          'app-title': AppTitle,
        },
      },
    });
    const geoloc = component.findComponent(ArtistList);
    expect(geoloc.exists()).toBe(true);
  });
});
