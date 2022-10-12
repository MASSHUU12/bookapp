import { View } from 'react-native';
import P from '../../../common/P';
import { t } from '../../../../i18n/strings';
import { useTheme } from '@react-navigation/native';

/**
 * Component displaying user statistics.
 *
 * @return {*}  {JSX.Element}
 */
const Stats = (): JSX.Element => {
  const { colors } = useTheme();

  return (
    <View>
      <P>{t.stats1}</P>
      <P>Chart.</P>
    </View>
  );
};

export default Stats;
