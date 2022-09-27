import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { strings } from '../../../i18n/strings';

const Settings = (): JSX.Element => {
  const [value, setValue] = useState(0);

  return (
    <View>
      <Text>{strings.nav4}</Text>
      <Button
        title="PL"
        onPress={() => {
          strings.setLanguage('pl');
          setValue(value => value + 1);
        }}
      />
      <Button
        title="EN"
        onPress={() => {
          strings.setLanguage('en');
          setValue(value => value + 1);
        }}
      />
    </View>
  );
};

export default Settings;
