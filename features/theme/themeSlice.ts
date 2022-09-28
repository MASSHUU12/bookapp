import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { colors as c } from '../../themes/colors';

interface ThemeState {
  colors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    onSurface: string;
    notification: string;
  };
}

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
