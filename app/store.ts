import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import themeNavigationReducer from '../features/navigationTheme/navigationThemeSlice';
import addReducer from '../features/add/addSlice';
import targetReducer from '../features/targets/targetSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    themeNavigation: themeNavigationReducer,
    add: addReducer,
    targets: targetReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
