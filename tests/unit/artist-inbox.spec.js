import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import ArtistInbox from '@/components/artists/ArtistInbox.vue';

const actions = {
  getArtistMessages: jest.fn(),
};

const getters = {
  getArtistMessages: jest.fn(),
};

const store = createStore({
  actions,
  getters
});

const config = {
  data() {
    return {
      messages: []
    }
  },
  global: {
    plugins: [store],
    stubs: {
      'router-link': RouterLinkStub,
    }
  }
}

/**
 * @module ArtistInboxTest
 */
describe('ArtistInbox.vue', () => {
  it('Check if row class is relevant', () => {
    const component = shallowMount(ArtistInbox, config);
    const row = component.find('.artist-inbox')
    expect(row.exists()).toBe(true);
  });
  it('Check if getArtistMessages action is called', async () => {
    const component = shallowMount(ArtistInbox, config);
    ArtistInbox.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getArtistMessages).toHaveBeenCalled;
  });
  it('Check if getArtistMessages getter is called', async () => {
    const component = shallowMount(ArtistInbox, config);
    ArtistInbox.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getArtistMessages).toHaveBeenCalled;
  });
});
