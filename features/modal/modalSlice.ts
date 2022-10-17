import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalType } from '../../types/modalsType';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: {
      note: 0,
      singleMore: 0,
    },
  },
  reducers: {
    toggleModal: (
      state,
      action: PayloadAction<{ name: ModalType; value: number }>,
    ): void => {
      switch (action.payload.name) {
        case 'note':
          state.value.note = action.payload.value;
          break;

        case 'singleMore':
          state.value.singleMore = action.payload.value;
          break;

        default:
          break;
      }
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
