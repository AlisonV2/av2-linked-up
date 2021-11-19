import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import EventItem from '@/components/organizers/EventItem';

const event = {
  id: 'gTvQIqYFzXCLID4TIU5u',
  name: 'Event',
  city: 'Bègles',
  zip: '33130',
  thumbnail: 'https://via.placeholder.com/150'
};

const config = {
  propsData: {
    event: event,
  },
  globals: {
    components: {
      'router-link': RouterLinkStub,
    },
  },
};
/**
 * @module EventItemTest
 */
describe('EventItem.vue', () => {
  it('EventItem Snapshot', () => {
    const component = shallowMount(EventItem, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Should render true', () => {
    const component = shallowMount(EventItem, config);
    const eventItem = component.find(
      '[data-test="gTvQIqYFzXCLID4TIU5u"]'
    );
    expect(eventItem.text()).toBe(event.name);
  });
});
