import { useState } from 'react';
import { Button, View } from 'react-native';
import { isDark } from '../../../../features/theme/themeSlice';
import { useAppDispatch } from '../../../../hooks';
import { t } from '../../../../i18n/strings';

const Options = () => {
  const [value, setValue] = useState(0);
  const dispatch = useAppDispatch();

  return (
    <View>
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

export default Options;
