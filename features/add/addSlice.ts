import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const addSlice = createSlice({
  name: 'add',
  initialState: {
    value: {
      title: '',
      type: '',
      number_of_pages: 0,
      current_page: 0,
      link: '',
    },
  },
  reducers: {
    addTitle: (state, action: PayloadAction<string>): void => {
      state.value.title = action.payload;
    },
    addType: (state, action: PayloadAction<'book' | 'audiobook'>): void => {
      state.value.type = action.payload;
    },
    addNumberOfPages: (state, action: PayloadAction<number>): void => {
      state.value.number_of_pages = action.payload;
    },
    addCurrentPage: (state, action: PayloadAction<number>): void => {
      state.value.current_page = action.payload;
    },
    addLink: (state, action: PayloadAction<string>): void => {
      state.value.link = action.payload;
    },
  },
});

export const { addTitle, addType, addNumberOfPages, addCurrentPage, addLink } =
  addSlice.actions;

export default addSlice.reducer;
