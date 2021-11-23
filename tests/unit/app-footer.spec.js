import { shallowMount } from '@vue/test-utils';
import AppFooter from '@/components/nav/Footer.vue';

const config = {
  data() {
    return {
      year: '2021',
    };
  },
};

describe('AppFooter.vue', () => {
  it('AppFooter Snapshot', () => {
    const component = shallowMount(AppFooter, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Checks year rendering', () => {
    const component = shallowMount(AppFooter, config);
    const copyright = component.get('.footer-right');
    expect(copyright.text()).toBe(
      '© Copyright 2021 - Alison Vandromme - All rights reserved'
    );
  });
});
