import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState } from 'interfaces/Theme';
import { colors as c } from 'themes/colors';

const initialState: ThemeState = {
  colors: { ...c().colors },
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    isDark: (state, action: PayloadAction<boolean>) => {
      state.colors = c(action.payload).colors;
    },
  },
});

export const { isDark } = themeSlice.actions;

export default themeSlice.reducer;
