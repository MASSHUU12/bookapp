import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import themeNavigationReducer from '../features/navigationTheme/navigationThemeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    themeNavigation: themeNavigationReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
