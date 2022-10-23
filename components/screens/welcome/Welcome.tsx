import { useEffect } from 'react';
import { View } from 'react-native';
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
    <View>
      <P>aaaaaa</P>
    </View>
  );
};

export default Welcome;
