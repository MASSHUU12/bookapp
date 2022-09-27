import { Text, StyleSheet } from 'react-native';

interface Props {
  children: string;
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

const P = (props: Props) => {
  return (
    <Text
      style={{
        ...styles.text,
        fontFamily: props.font ? props.font : 'AndadaPro-Regular',
      }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#000000',
  },
});

export default P;
