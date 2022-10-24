import { NativeModules, Platform } from 'react-native';
import { t } from 'i18n/strings';

const getLocale = (): string => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier; // Android
};

const getLocaleShort = (): string => {
  return getLocale().split(/(_|-)/)[0];
};

const detectWithFallback = (): string => {
  const detectedLocale = getLocaleShort();

  // Check if detected locale is supported by app.
  t.getAvailableLanguages().map(locale => {
    if (locale === detectedLocale) return detectedLocale;
  });
  // If locale is not supported return default.
  return 'en';
};

export const locale = {
  get: getLocale(),
  getShort: getLocaleShort(),
  detectWithFallback: detectWithFallback(),
};
