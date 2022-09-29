import { Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../../hooks';

interface Props {
  children: string;
  size?: number;
  color?: string;
  font?:
    | 'AndadaPro-Bold'
    | 'AndadaPro-BoldItalic'
    | 'AndadaPro-ExtraBold'
    | 'AndadaPro-ExtraBoldItalic'
    | 'AndadaPro-Italic'
    | 'AndadaPro-Medium'
    | 'AndadaPro-MediumItalic'
    | 'AndadaPro-Regular'
    | 'AndadaPro-SemiBold'
    | 'AndadaPro-SemiBoldItalic';
}

/**
 *
 *  Replacement for Text component.
 *
 *  @param size - Font size
 *  @param color - Font color
 *  @param font - Font name
 *
 */
const P = (props: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <Text
      style={{
        ...styles.text,
        fontSize: props.size ? props.size : 18,
        color: props.color ? props.color : colors.text,
        fontFamily: props.font ? props.font : 'AndadaPro-Regular',
      }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});

export default P;
