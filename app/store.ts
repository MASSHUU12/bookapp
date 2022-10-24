import { configureStore } from '@reduxjs/toolkit';

import themeReducer from 'features/theme/themeSlice';
import themeNavigationReducer from 'features/navigationTheme/navigationThemeSlice';
import addReducer from 'features/add/addSlice';
import targetReducer from 'features/targets/targetSlice';
import modalSlice from 'features/modal/modalSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    themeNavigation: themeNavigationReducer,
    add: addReducer,
    targets: targetReducer,
    modal: modalSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
