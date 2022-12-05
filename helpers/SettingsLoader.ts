import store from 'app/store';
import { isNavigationDark } from 'features/navigationTheme/navigationThemeSlice';
import { targetPerMonth } from 'features/targets/targetSlice';
import { isDark } from 'features/theme/themeSlice';
import { t } from 'i18n/strings';
import { locale } from './Locale';
import { getItem, setItem } from './Storage';
import Config from "react-native-config";
import { log } from "./log";

/**
 * Loads application settings.
 *
 * @return {*} {void}
 */
export const settingsLoader = (): void => {
  // Load language.
  getItem('language').then(item => {
    if (item === null || item === 'auto')
      /**
       * If the user has not set the language,
       * the application is being launched for the first time,
       * or the user has set automatic language detection, use the system language.
       */
      t.setLanguage(locale.detectWithFallback);
    // Load user specified language.
    else t.setLanguage(item as string);
  });

  // Load theme.
  getItem('theme').then(item => {
    let i = item === null ? 'light' : item;

    store.dispatch(isDark(i !== 'light'));
    store.dispatch(isNavigationDark(i !== 'light'));
  });

  // Load goals.
  getItem('target_month').then(item => {
    store.dispatch(targetPerMonth(item === null ? '0' : item));
  });
  getItem('target_year').then(item => {
    store.dispatch(targetPerMonth(item === null ? '0' : item));
  });

  // Load config for logs
  if (Config.PRODUCTION === 'true')
    getItem('logsEnabled').then((enabled) => {
      setItem('logsEnabled', enabled === null ? 'true' : enabled).catch((e) => log(e))
    })
};
