import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: 0,
  },
  reducers: {
    toggleModal: (state, action: PayloadAction<number>): void => {
      state.value = action.payload;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
