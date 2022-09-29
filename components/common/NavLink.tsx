import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { useAppSelector } from '../../hooks';
import P from './P';

interface Props {
  text: string;
  target: string;
}

/**
 * Button in the form of text that moves between screens.
 *
 * @param {Props} { text, target }
 * @return {*}  {JSX.Element}
 */
const NavLink = ({ text, target }: Props): JSX.Element => {
  const navigation = useNavigation();
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(target);
      }}>
      <P color={colors.link}>{text}</P>
    </Pressable>
  );
};

export default NavLink;
