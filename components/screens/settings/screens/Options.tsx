import { useState } from 'react';
import { Button, View } from 'react-native';
import { t } from '../../../../i18n/strings';

const Options = () => {
  const [value, setValue] = useState(0);

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
    </View>
  );
};

export default Options;
