import { useEffect, useState } from 'react';
import { Button, StyleSheet, ScrollView } from 'react-native';
import { isNavigationDark } from '../../../../features/navigationTheme/navigationThemeSlice';
import { isDark } from '../../../../features/theme/themeSlice';
import { locale } from '../../../../helpers/Locale';
import { setItem } from '../../../../helpers/Storage';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import OptionsBtn from '../../../common/OptionsBtn';

/**
 * General options screen. Allows to change the language, or theme.
 *
 * @return {*} {JSX.Element}
 */
const Options = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const colors = useAppSelector(state => state.theme.colors);

  // Available languages.
  const [languages] = useState(['Auto', ...t.getAvailableLanguages()]);
  // Functions to switch language.
  const [langFunc, setLangFunc] = useState<any[]>([]);

  // Generates functions that will later be passed to the buttons.
  useEffect(() => {
    languages.map(item => {
      let arr = langFunc;

      arr.push(async () => {
        if (item.toLowerCase() === 'auto')
          t.setLanguage(locale.detectWithFallback);
        else t.setLanguage(item);

        // Update language in storage.
        await setItem('language', item);
      });

      setLangFunc(arr);
    });
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: colors.background, ...styles.container }}>
      <OptionsBtn
        text="Language"
        modalTexts={languages}
        modalActions={langFunc}
      />
      <OptionsBtn
        text="Theme"
        marginTop={15}
        modalTexts={['Dark theme', 'Light theme']}
        modalActions={[
          async () => {
            dispatch(isDark(false));
            dispatch(isNavigationDark(false));

            // Update theme in storage.
            await setItem('theme', 'light');
          },
          async () => {
            dispatch(isDark(true));
            dispatch(isNavigationDark(true));

            // Update theme in storage.
            await setItem('theme', 'dark');
          },
        ]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
  },
});

export default Options;
