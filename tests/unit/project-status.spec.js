import { shallowMount } from '@vue/test-utils';
import ProjectStatus from '@/components/admin/ProjectStatus';

/**
 * @module ProjectStatusTest
 */
describe('Categories.vue', () => {
  it('Categories Snapshot', () => {
    const component = shallowMount(ProjectStatus);
    expect(component.element).toMatchSnapshot();
  });

  it('Check if CategoriesGeoloc is rendered', () => {
    const component = shallowMount(ProjectStatus);
    const item = component.find('.project-bullet');
    expect(item.exists()).toBe(true);
  });
});
