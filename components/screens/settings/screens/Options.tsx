import { useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { isDark } from '../../../../features/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { t } from '../../../../i18n/strings';

const Options = () => {
  const [value, setValue] = useState(0);
  // const [, forceUpdate] = useReducer(x => x + 1, 0);
  const dispatch = useAppDispatch();
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }}>
      {t.getAvailableLanguages().map(item => (
        <Button
          title={item.toUpperCase()}
          onPress={() => {
            t.setLanguage(item);
            setValue(value => value + 1);
          }}
        />
      ))}
      <Button title="Light theme" onPress={() => dispatch(isDark(false))} />
      <Button title="Dark theme" onPress={() => dispatch(isDark(true))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Options;
