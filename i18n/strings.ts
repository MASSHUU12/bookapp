import LocalizedString from 'react-native-localization';
import { en } from './en/en';
import { pl } from './pl/pl';

export const strings = new LocalizedString({
  ...en,
  ...pl,
});
