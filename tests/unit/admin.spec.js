import { shallowMount } from '@vue/test-utils';
import Admin from '@/views/Admin.vue';
import Sidenav from '@/components/admin/Sidenav';

/**
 * @module AdminPageTest
 */
describe('Admin.vue', () => {
  /**
   * Check if Sidenav is rendered
   */
  it('Check if Sidenav is rendered', () => {
    const component = shallowMount(Admin, {
      global: {
        components: {
          Sidenav,
        },
        stubs: ['router-view'],
      },
    });
    const admin = component.findComponent(Sidenav);
    expect(admin.exists()).toBe(true);
  });
});
