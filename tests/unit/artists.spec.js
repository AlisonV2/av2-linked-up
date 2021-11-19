import { shallowMount } from '@vue/test-utils';
import Artists from '@/views/Artists.vue';
import ArtistList from '@/components/artists/ArtistList.vue';
import AppTitle from '@/components/app/Title.vue';

const config = {
  global: {
    components: {
      ArtistList,
      'app-title': AppTitle,
    },
  },
};

/**
 * @module ArtistPageTest
 */
describe('Artists.vue', () => {
  it('Artists Snapshot', () => {
    const component = shallowMount(Artists, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if ArtistList is rendered', () => {
    const component = shallowMount(Artists, config);
    const artists = component.findComponent(ArtistList);
    expect(artists.exists()).toBe(true);
  });
});
