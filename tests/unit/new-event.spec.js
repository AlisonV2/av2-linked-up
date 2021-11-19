import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import NewEvent from '@/components/organizers/NewEvent.vue';
import AppButton from '@/components/app/Button';
import AppTitle from '@/components/app/Title';

const actions = {
  setEventThumbnail: jest.fn(),
  setNewEvent: jest.fn(),
};

const getters = {
  getEventById: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const $route = {
  params: { id: 1 },
};

const $router = { 
    push: jest.fn() 
};

const config = {
  data() {
    return {
      previewImage: null,
      event: {
        name: '',
        description: '',
        date: '',
        city: '',
        zip: '',
        thumbnail: '',
      },
      showSuccessToast: false,
      showErrorToast: false,
      fileSelected: null,
      fileErr: null,
    };
  },
  global: {
    plugins: [store],
    components: {
      'app-button': AppButton,
      'app-title': AppTitle,
    },
    mocks: {
      $route,
      $router
    },
  },
};

/**
 * @module NewEventTest
 */
describe('NewEvent.vue', () => {
  it('NewEvent Snapshot', () => {
    const component = shallowMount(NewEvent, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if setEventThumbnail action is called', async () => {
    const component = shallowMount(NewEvent, config);
    component.find('.thumbnail-button').trigger('click');
    await component.vm.$nextTick();
    expect(actions.setEventThumbnail).toHaveBeenCalled;
  });

  it('Check if setArtistProfile action is called', async () => {
    const component = shallowMount(NewEvent, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.setNewEvent).toHaveBeenCalled;
  });

  it('Check if toastError component is visible', async () => {
    const component = shallowMount(NewEvent, {
      ...config,
      data() {
        return {
          showSuccessToast: false,
          showErrorToast: true,
        };
      },
    });
    const error = component.find('.toast-error');
    expect(error.exists()).toBe(true);
  });

  it('setPreviewImage should be called', () => {
    const component = shallowMount(NewEvent, config);
    const file = component.find('input[type="file"]');
    file.trigger('change');
    expect(component.vm.setPreviewImage).toHaveBeenCalled;
  });
});
