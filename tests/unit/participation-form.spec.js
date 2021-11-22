import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ParticipationForm from '@/components/auth/ParticipationForm.vue';
import AppTitle from '@/components/app/Title.vue';
import AppButton from '@/components/app/Button.vue';

let actions = {
  setParticipation: jest.fn(),
};

const store = createStore({
  actions,
});

const $router = {
  push: jest.fn(),
};

const $route = {
  name: 'AdminEvents'
};

const config = {
  data() {
    return {
      tickets: 2,
      error: null,
      id: '1'
    };
  },
  global: {
    plugins: [store],
    mocks: {
      $router,
      $route
    },
    components: {
      'app-title': AppTitle,
      'app-button': AppButton,
    },
  },
};

/**
 * @module ParticipationFormTest
 */
describe('ParticipationForm.vue', () => {
  it('ParticipationForm Snapshot', () => {
    const component = shallowMount(ParticipationForm, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Dispatches setParticipation action on submit', async () => {
    const component = shallowMount(ParticipationForm, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect(actions.setParticipation).toHaveBeenCalled;
  });

  it('Expects router push to have been called with AdminEvents params', async () => {
    const component = shallowMount(ParticipationForm, config);
    component.find('form').trigger('submit.prevent');
    await component.vm.$nextTick();
    expect($router.push).toHaveBeenCalled;
  });
});
