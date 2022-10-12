import { KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface Props {
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChange: any;
  redux?: boolean;
}

/**
 *
 *
 * @param {Props} {
 *   placeholder,
 *   keyboardType = 'default',
 *   value,
 *   onChange,
 * }
 * @return {*}  {JSX.Element}
 */
const Input = ({
  placeholder,
  keyboardType = 'default',
  value,
  onChange,
  redux = true,
}: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const dispatch = useAppDispatch();

  return (
    <TextInput
      style={{
        color: colors.placeholder,
        backgroundColor: colors.surface,
        ...styles.container,
      }}
      placeholder={placeholder}
      placeholderTextColor={colors.placeholder}
      value={value}
      onChangeText={text => (redux ? dispatch(onChange(text)) : onChange(text))}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'AndadaPro-Medium',
    fontSize: 14,
    width: '100%',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 15,
  },
});

export default Input;
