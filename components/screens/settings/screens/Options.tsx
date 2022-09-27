import { useState } from 'react';
import { Button, View } from 'react-native';
import { t } from '../../../../i18n/strings';

const Options = () => {
  const [value, setValue] = useState(0);

  return (
    <View>
      <Button
        title="PL"
        onPress={() => {
          t.setLanguage('pl');
          setValue(value => value + 1);
        }}
      />
      <Button
        title="EN"
        onPress={() => {
          t.setLanguage('en');
          setValue(value => value + 1);
        }}
      />
    </View>
  );
};

export default Options;
