import LocalizedString from 'react-native-localization';
import { en } from './en/en';
import { pl } from './pl/pl';

export const t = new LocalizedString({
  ...en,
  ...pl,
});
