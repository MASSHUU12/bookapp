import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable, StyleSheet } from 'react-native';
import P from '../../../common/P';

interface Props {
  icon?: string;
  text: string;
  action: () => any;
}

/**
 * Button used in settings screen.
 *
 * *Note: Supports only Ionicons icons*
 *
 * @param {Props} { icon, text, action }
 * @return {*}  {JSX.Element}
 */
const SettingsBtn = ({ icon, text, action }: Props): JSX.Element => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.container,
      ]}
      onPress={action}>
      {icon ? (
        <Ionicons style={styles.icon} name={icon} size={24} color="#6D6D6D" />
      ) : (
        ''
      )}
      <P color="#6D6D6D">{text}</P>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
    marginTop: 15,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 15,
  },
});

export default SettingsBtn;
