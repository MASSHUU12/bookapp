import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { ThemeNavigationContext } from '../../../../App';
import { isNavigationDark } from '../../../../features/navigationTheme/navigationThemeSlice';
import { isDark } from '../../../../features/theme/themeSlice';
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
  const { setIsThemeNavigationDark } = React.useContext(ThemeNavigationContext);

  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }}>
      {t.getAvailableLanguages().map(item => (
        <Button
          title={item.toUpperCase()}
          onPress={() => {
            t.setLanguage(item);
          }}
        />
      ))}
      <Button
        title="Light theme"
        onPress={() => {
          dispatch(isDark(false));
          dispatch(isNavigationDark(false));
          setIsThemeNavigationDark(false);
        }}
      />
      <Button
        title="Dark theme"
        onPress={() => {
          dispatch(isDark(true));
          dispatch(isNavigationDark(true));
          setIsThemeNavigationDark(true);
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
