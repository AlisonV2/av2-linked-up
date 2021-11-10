import { shallowMount } from '@vue/test-utils';
import ClientEvents from '@/components/clients/ClientEvents.vue';

/**
 * @module ClientEventsTest
 */
describe('ClientEvents.vue', () => {
  it('ClientEvents Snapshot', () => {
    const component = shallowMount(ClientEvents);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if row class is relevant', () => {
    const component = shallowMount(ClientEvents);
    const row = component.find('.client-events');
    expect(row.exists()).toBe(true);
  });
});
