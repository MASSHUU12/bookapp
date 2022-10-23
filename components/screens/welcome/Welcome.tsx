import { useEffect } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { commonStyles } from '../../../styles/commonStyles';
import P from '../../common/P';

const Welcome = ({ navigation }: any): JSX.Element => {
  useEffect(() => {
    navigation.addListener(
      'beforeRemove',
      (e: { preventDefault: () => void }) => {
        e.preventDefault();
      },
    );
  }, [navigation]);

  return (
    <View style={{ ...commonStyles.basicScreen }}>
      <P>{`Welcome to ${Config.APP_NAME}`}</P>
    </View>
  );
};

export default Welcome;
