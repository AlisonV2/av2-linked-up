import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import HomeCategories from '@/components/home/Categories';
import AppTitle from '@/components/app/Title';

const actions = {
  getArtistsByStyle: jest.fn(),
};

const store = createStore({
  actions,
});

const $router = {
  push: jest.fn(),
};

const $route = {
  name: 'Home',
};

const config = {
  global: {
    plugins: [store],
    stubs: {
      RouterLink: RouterLinkStub,
      'app-title': AppTitle,
    },
    mocks: {
      $router,
      $route,
    },
  },
};

/**
 * @module HomeCategoriesTest
 */
describe('HomeCategories.vue', () => {
  it('HomeCategories Snapshot', () => {
    const component = shallowMount(HomeCategories, config);
    expect(component.element).toMatchSnapshot();
  });

  it('setCategory event should be called', async () => {
    const component = shallowMount(HomeCategories, config);
    component.find('[data-test="black-work"]').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted().setCategory).toHaveBeenCalled;
  });

  it('Router push should be called', async () => {
    const component = shallowMount(HomeCategories, config);
    await component.find('[data-test="black-work"]').trigger('click');
    expect($router.push).toHaveBeenCalledWith({ name: 'CategoriesResults' });
  });

  it('getArtistsByStyle should be called', async () => {
    const component = shallowMount(HomeCategories, config);
    component.find('[data-test="black-work"]').trigger('click');
    await component.vm.$nextTick();
    expect(actions.getArtistsByStyle).toHaveBeenCalled();
  });
});
