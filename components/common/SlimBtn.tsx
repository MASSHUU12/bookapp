import { Pressable, StyleSheet } from 'react-native';
import { useAppSelector } from 'hooks';
import { commonStyles } from 'styles/commonStyles';
import P from './P';

interface Props {
  text: string;
  action: () => any;
}

const SlimBtn = ({ text, action }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: colors.optionsBtn,
          ...commonStyles.flexCenter,
          ...styles.btn,
        },
      ]}
      onPress={() => action()}>
      <P size={14} color={colors.text4}>
        {text}
      </P>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 7,
    width: '100%',
    marginBottom: 10,
    borderRadius: 20,
  },
});

export default SlimBtn;
