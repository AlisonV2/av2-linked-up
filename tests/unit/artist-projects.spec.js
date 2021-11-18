import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ArtistProjects from '@/components/artists/ArtistProjects.vue';
import ProjectItem from '@/components/admin/ProjectItem.vue';

const actions = {
  getArtistProjects: jest.fn(),
};

const getters = {
  getArtistProjects: jest.fn(),
};

const store = createStore({
  actions,
  getters,
});

const config = {
  data() {
    return {
      projects: [],
    };
  },
  global: {
    plugins: [store],
    components: {
        ProjectItem,
    }
  },
};

/**
 * @module ArtistProjectsTest
 */
describe('ArtistProjects.vue', () => {
  it('ArtistProjects Snapshot', () => {
    const component = shallowMount(ArtistProjects, config);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if getArtistProjects action is called', async () => {
    const component = shallowMount(ArtistProjects, config);
    ArtistProjects.created.call(component.vm);
    await component.vm.$nextTick();
    expect(actions.getArtistProjects).toHaveBeenCalled;
  });

  it('Check if getArtistProjects getter is called', async () => {
    const component = shallowMount(ArtistProjects, config);
    ArtistProjects.created.call(component.vm);
    await component.vm.$nextTick();
    expect(getters.getArtistProjects).toHaveBeenCalled;
  });
});
