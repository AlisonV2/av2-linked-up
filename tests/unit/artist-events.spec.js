import { shallowMount } from '@vue/test-utils';
import ArtistEvents from '@/components/artists/ArtistEvents.vue';

/**
 * @module ArtistEventsTest
 */
describe('ArtistEvents.vue', () => {
  it('Check if row class is relevant', () => {
    const component = shallowMount(ArtistEvents);
    const row = component.find('.artist-events')
    expect(row.exists()).toBe(true);
  });
});
