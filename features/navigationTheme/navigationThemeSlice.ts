import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeNavigation } from 'interfaces/Theme';
import { colorsNavigation as c } from 'themes/colorsNavigation';

const initialState: ThemeNavigation = {
  value: { ...c() },
};

export const themeNavigationSlice = createSlice({
  name: 'themeNavigation',
  initialState,
  reducers: {
    isNavigationDark: (state, action: PayloadAction<boolean>) => {
      state.value = c(action.payload);
    },
  },
});

export const { isNavigationDark } = themeNavigationSlice.actions;

export default themeNavigationSlice.reducer;
