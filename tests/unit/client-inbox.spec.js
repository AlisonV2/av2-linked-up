import { shallowMount } from '@vue/test-utils';
import ClientInbox from '@/components/clients/ClientInbox.vue';

/**
 * @module ClientInboxTest
 */
describe('ClientInbox.vue', () => {
  it('Check if row class is relevant', () => {
    const component = shallowMount(ClientInbox);
    const row = component.find('.client-inbox')
    expect(row.exists()).toBe(true);
  });
});
