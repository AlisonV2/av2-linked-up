import { shallowMount } from '@vue/test-utils';
import ArtistInbox from '@/components/artists/ArtistInbox.vue';

/**
 * @module ArtistInboxTest
 */
describe('ArtistInbox.vue', () => {
  it('Check if row class is relevant', () => {
    const component = shallowMount(ArtistInbox);
    const row = component.find('.artist-inbox')
    expect(row.exists()).toBe(true);
  });
});
