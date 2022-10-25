import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { isNavigationDark } from 'features/navigationTheme/navigationThemeSlice';
import { isDark } from 'features/theme/themeSlice';
import { locale } from 'helpers/Locale';
import { setItem } from 'helpers/Storage';
import { useAppDispatch, useAppSelector } from 'hooks';
import { t } from 'i18n/strings';
import OptionsBtn from '@common/OptionsBtn';
import { commonStyles } from 'styles/commonStyles';

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
      style={{
        backgroundColor: colors.background,
        ...commonStyles.basicScreen,
      }}>
      <OptionsBtn
        name="languageSelection"
        text={t.settings4}
        modalTexts={languages}
        modalActions={langFunc}
      />
      <OptionsBtn
        name="themeSelection"
        text={t.settings5}
        modalTexts={[t.options1, t.options2]}
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

export default Options;
