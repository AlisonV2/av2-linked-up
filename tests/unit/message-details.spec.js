import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import MessageDetails from '@/components/admin/MessageDetails.vue';

const actions = {
  getMessages: jest.fn(),
  getCurrentUser: jest.fn(),
  sendMessage: jest.fn(),
};

const getters = {
  getMessages: jest.fn(),
  getCurrentUser: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const $route = {
  params: { id: 1 },
};

const config = {
  data() {
    return {
      messages: [],
      userId: '',
      newMessage: ''
    };
  },
  global: {
    plugins: [store],
    mocks: { $route },
  },
};

/**
 * @module MessageDetailsTest
 */
describe('MessageDetails.vue', () => {
  it('MessageDetails Snapshot', () => {
    const component = shallowMount(MessageDetails, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getMessages action should have been called', async () => {
    const component = shallowMount(MessageDetails, config);
    MessageDetails.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getMessages).toHaveBeenCalled;
  });

  it('getMessages getter should have been called', async () => {
    const component = shallowMount(MessageDetails, config);
    MessageDetails.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getMessages).toHaveBeenCalled;
  });
  it('Dispatches sendMessage action on submit', async () => {
    const component = shallowMount(MessageDetails, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.sendMessage).toHaveBeenCalled();
  });
  it('getMessages action should be called on submit', async () => {
    const component = shallowMount(MessageDetails, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.getMessages).toHaveBeenCalled();
  });
});
