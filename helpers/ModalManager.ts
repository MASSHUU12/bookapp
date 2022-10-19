import store from '../app/store';
import { toggleModal } from '../features/modal/modalSlice';
import { ModalType } from '../types/modalsType';

/**
 * Open specified modal.
 *
 * @param {ModalType} name
 */
const openModal = (name: ModalType): void => {
  store.dispatch(toggleModal({ name, value: 1 }));
};

/**
 * Close specified modal.
 *
 * @param {ModalType} name
 */
const closeModal = (name: ModalType): void => {
  store.dispatch(toggleModal({ name, value: 0 }));
};

export const modal = {
  open: openModal,
  close: closeModal,
};
