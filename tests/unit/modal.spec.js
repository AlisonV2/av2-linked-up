import { shallowMount } from '@vue/test-utils';
import AppModal from '@/components/app/Modal';

/**
 * @module AppModalTest
 */
describe('AppModal.vue', () => {
  it('Modal should not be visible', () => {
    const component = shallowMount(AppModal, {
        props: {
            show: false,
            scrollable: false
        }
    });
    expect(component.find('.modal-dialog')).not.toBeVisible;
  });

  it('Modal should be visible', () => {
    const component = shallowMount(AppModal, {
        props: {
            show: true,
            scrollable: false
        }
    });
    expect(component.find('.modal-dialog')).toBeVisible;
  });
  it('should render correct contents', () => {
    const component = shallowMount(AppModal, {
        props: {
            show: true,
            scrollable: false
        }
    });
    component.get('.close-btn').trigger('click');
    expect(component.find('.modal-dialog')).not.toBeVisible;
  });
  it('Close event should be called', () => {
    const component = shallowMount(AppModal, {
        props: {
            show: true,
            scrollable: false
        }
    });
    component.get('.close-btn').trigger('click');
    expect(component.emitted().close).toHaveBeenCalled;
  });
  it('Handler method should be called', () => {
    const component = shallowMount(AppModal, {
        props: {
            show: true,
            scrollable: false
        }
    });
    component.get('.modal-backdrop').trigger('click');
    expect(component.emitted().onClickAway).toHaveBeenCalled;
  });
  it('Handler method should be called', () => {
    const component = shallowMount(AppModal, {
        props: {
            show: true,
            scrollable: false
        }
    });
    AppModal.unmounted.call(component.vm);
    expect(component.emitted().handler).toHaveBeenCalled;
  });
});