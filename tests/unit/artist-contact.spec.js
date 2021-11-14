import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import ArtistContact from '@/views/ArtistContact';
import AppButton from '@/components/app/Button';

const actions = {
  getCurrentUser: jest.fn(),
  setNewProject: jest.fn(),
};

const getters = {
  getCurrentUser() {
    return {
      uid: '1',
      displayName: 'User',
    };
  },
};

const store = createStore({
  actions,
  getters,
});

const $router = {
  push: jest.fn(),
};

const $route = {
  params: { id: '1', artist: 'Artist' },
};

const config = {
  data() {
    return {
      artist: {
        id: 1,
        name: 'Artist',
        description: 'Description',
        thumbnail: 'Thumbnail',
        socialLink: 'Social',
        shop: 'Shop',
        insta: 'Insta',
        city: 'City',
        zip: 'Zip',
        style: 'Style',
      },
      id: '1',
      userId: '1',
      description: 'Blablabla description',
      title: 'Blabla',
    };
  },
  global: {
    plugins: [store],
    stubs: {
      'app-button': AppButton,
      'router-link': RouterLinkStub
    },
    mocks: {
      $router,
      $route,
    },
  },
};

/**
 * @module ArtistContactTest
 */
describe('ArtistContact.vue', () => {
  it('ArtistContact Snapshot', () => {
    const component = shallowMount(ArtistContact, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getCurrentUser action should be called', async () => {
    const component = shallowMount(ArtistContact, config);
    ArtistContact.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getCurrentUser).toHaveBeenCalled;
  });

  it('getCurrentUser getter should be called', async () => {
    const component = shallowMount(ArtistContact, config);
    ArtistContact.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getCurrentUser).toHaveBeenCalled;
  });

  it('handleSubmit should be called with correct route params', async () => {
    const component = shallowMount(ArtistContact, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect($router.push).toHaveBeenCalled;
  });

  it('handleSubmit should trigger setNewProject action', async () => {
    const component = shallowMount(ArtistContact, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.setNewProject).toHaveBeenCalled;
  });
});
