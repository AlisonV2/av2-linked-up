import { shallowMount } from '@vue/test-utils';
import Participation from '@/views/Participation.vue';
import ParticipationForm from '@/components/auth/ParticipationForm';

const $route = {
  params: { id: '1' },
};

const config = {
  data() {
    return {
      id: '1',
    };
  },
  global: {
    components: {
      ParticipationForm,
    },
    mocks: {
      $route,
    },
  },
};
/**
 * @module ParticipationPageTest
 */
describe('Participation.vue', () => {
  it('ParticipationPage Snapshot', () => {
    const component = shallowMount(Participation, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if ParticipationForm is rendered', () => {
    const component = shallowMount(Participation, config);
    const form = component.findComponent(ParticipationForm);
    expect(form.exists()).toBe(true);
  });

  it('Check if ParticipationForm is rendered', () => {
    const component = shallowMount(Participation, config);
    const computed = component.vm.id;
    expect(computed).toBe('1');
  });
});
