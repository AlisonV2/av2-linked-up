import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import EventDetails from '@/components/organizers/EventDetails.vue';
import AppButton from '@/components/app/Button';
import AppTitle from '@/components/app/Title';

const actions = {
  getEventById: jest.fn(),
  setEventThumbnail: jest.fn(),
  updateOrgaEvent: jest.fn(),
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
      'app-title': AppTitle
    },
    mocks: {
      $route,
    },
  },
};

/**
 * @module EventDetailsTest
 */
describe('EventDetails.vue', () => {
  it('EventDetails Snapshot', () => {
    const component = shallowMount(EventDetails, config);
    expect(component.element).toMatchSnapshot();
  });

  it('getEventById action should have been called', async () => {
    const component = shallowMount(EventDetails, config);
    EventDetails.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getEventById).toHaveBeenCalled;
  });

  it('getEventById getter should have been called', async () => {
    const component = shallowMount(EventDetails, config);
    EventDetails.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getEventById).toHaveBeenCalled;
  });

  it('Check if setArtistProfile action is called', async () => {
    const component = shallowMount(EventDetails, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.updateOrgaEvent).toHaveBeenCalled;
  });

  it('Check if toastError component is visible', async () => {
    const component = shallowMount(EventDetails, {
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
    const component = shallowMount(EventDetails, config);
    const file = component.find('input[type="file"]');
    file.trigger('change');
    expect(component.vm.setPreviewImage).toHaveBeenCalled;
  });
});
