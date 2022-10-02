import { Button, View, StyleSheet } from 'react-native';
import { isNavigationDark } from '../../../../features/navigationTheme/navigationThemeSlice';
import { isDark } from '../../../../features/theme/themeSlice';
import { setItem } from '../../../../helpers/Storage';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { t } from '../../../../i18n/strings';

/**
 * General options screen. Allows to change the language, or theme.
 *
 * @return {*} {JSX.Element}
 */
const Options = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }}>
      {t.getAvailableLanguages().map(item => (
        <Button
          title={item.toUpperCase()}
          onPress={async () => {
            t.setLanguage(item);

            // Update language in storage.
            await setItem('language', item);
          }}
        />
      ))}
      <Button
        title="Light theme"
        onPress={async () => {
          dispatch(isDark(false));
          dispatch(isNavigationDark(false));

          // Update theme in storage.
          await setItem('theme', 'light');
        }}
      />
      <Button
        title="Dark theme"
        onPress={async () => {
          dispatch(isDark(true));
          dispatch(isNavigationDark(true));

          // Update theme in storage.
          await setItem('theme', 'dark');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Options;
