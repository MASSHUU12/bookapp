import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import themeNavigationReducer from '../features/navigationTheme/navigationThemeSlice';
import addReducer from '../features/add/addSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    themeNavigation: themeNavigationReducer,
    add: addReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
