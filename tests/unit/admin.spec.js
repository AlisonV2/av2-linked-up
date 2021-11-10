import { shallowMount } from '@vue/test-utils';
import Admin from '@/views/Admin.vue';
import Sidenav from '@/components/admin/Sidenav';

const config = {
  global: {
    components: {
      Sidenav,
    },
    stubs: ['router-view'],
  },
};

/**
 * @module AdminPageTest
 */
describe('Admin.vue', () => {
  it('AdminPage Snapshot', () => {
    const component = shallowMount(Admin, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if Sidenav is rendered', () => {
    const component = shallowMount(Admin, config);
    const admin = component.findComponent(Sidenav);
    expect(admin.exists()).toBe(true);
  });
});
