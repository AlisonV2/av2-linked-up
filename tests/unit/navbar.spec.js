import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import AppNavbar from '@/components/nav/Navbar.vue';

describe('Navbar.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(AppNavbar, {
      data() {
        return {
          isActive: false,
        };
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });

    // check the name of the component
    expect(wrapper.vm.$options.name).toMatch('Navbar');

    // check that the title is rendered
    expect(wrapper.text()).toMatch('Login');
  });
});
