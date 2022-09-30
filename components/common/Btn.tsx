import { Pressable, StyleSheet } from 'react-native';
import P from './P';

interface Props {
  text: string;
}

const Btn = ({ text }: Props): JSX.Element => {
  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1, ...styles.container },
      ]}>
      <P size={16} color="#28373E">
        {text}
      </P>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5EFF3',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Btn;
