import { shallowMount } from '@vue/test-utils';
import AppFooter from '@/components/nav/Footer.vue';

describe('AppFooter.vue', () => {
  it('Checks year rendering', () => {
    const component = shallowMount(AppFooter, {
      data() {
        return {
          year: '2021',
        };
      },
    });
    const copyright = component.get('[data-test="copyright"]');
    expect(copyright.text()).toBe(
      '© Copyright 2021 - Alison Vandromme - All rights reserved'
    );
  });
});
