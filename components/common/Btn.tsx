import { Pressable, StyleSheet } from 'react-native';
import { useAppSelector } from '../../hooks';
import { ColorsType } from '../../types/colors';
import P from './P';

interface Props {
  text: string;
  color?: ColorsType | string;
  bg?: ColorsType | string;
  action: () => any;
}

const Btn = ({ text, color, bg, action }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <Pressable
      onPress={() => action()}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: bg === undefined ? colors.text4 : (bg as string),
          ...styles.container,
        },
      ]}>
      <P color={color === undefined ? colors.white : color}>{text}</P>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default Btn;
