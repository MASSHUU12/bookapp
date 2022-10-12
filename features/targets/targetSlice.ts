import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const themeNavigationSlice = createSlice({
  name: 'targets',
  initialState: {
    value: {
      targetPerMonth: '0',
      targetPerYear: '0',
    },
  },
  reducers: {
    targetPerMonth: (state, action: PayloadAction<string>) => {
      state.value.targetPerMonth = action.payload;
    },
    targetPerYear: (state, action: PayloadAction<string>) => {
      state.value.targetPerYear = action.payload;
    },
  },
});

export const { targetPerMonth, targetPerYear } = themeNavigationSlice.actions;

export default themeNavigationSlice.reducer;
