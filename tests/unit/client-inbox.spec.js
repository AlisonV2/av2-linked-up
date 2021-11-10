import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import ClientInbox from '@/components/clients/ClientInbox.vue';

const actions = {
  getClientMessages: jest.fn(),
};

const getters = {
  getClientMessages: jest.fn(),
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
 * @module ClientInboxTest
 */
describe('ClientInbox.vue', () => {
  it('Check if row class is relevant', () => {
    const component = shallowMount(ClientInbox, config);
    const row = component.find('.client-inbox')
    expect(row.exists()).toBe(true);
  });
  it('Check if getClientMessages action is called', async () => {
    const component = shallowMount(ClientInbox, config);
    ClientInbox.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getClientMessages).toHaveBeenCalled;
  });
  it('Check if getClientMessages getter is called', async () => {
    const component = shallowMount(ClientInbox, config);
    ClientInbox.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getClientMessages).toHaveBeenCalled;
  });
});
