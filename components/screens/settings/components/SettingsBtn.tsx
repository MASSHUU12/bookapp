import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable, StyleSheet } from 'react-native';
import { useAppSelector } from 'hooks';
import P from '@common/P';

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
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: colors.white,
        },
        styles.container,
      ]}
      onPress={action}>
      {icon ? (
        <Ionicons
          style={styles.icon}
          name={icon}
          size={24}
          color={colors.placeholder}
        />
      ) : (
        ''
      )}
      <P color={colors.placeholder}>{text}</P>
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
  },
  icon: {
    marginRight: 15,
  },
});

export default SettingsBtn;
