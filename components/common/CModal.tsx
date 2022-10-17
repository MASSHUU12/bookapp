import { Modal, Pressable, StyleSheet } from 'react-native';
import { toggleModal } from '../../features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import P from './P';

interface Props {
  text: string;
  marginTop?: number;
  children?: JSX.Element;
}

/**
 * General-purpose modal, prepared to store all kinds of components.
 *
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const CModal = (props: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const state = useAppSelector(state => state.modal.value);

  const dispatch = useAppDispatch();

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            backgroundColor: colors.optionsBtn,
            marginTop: props.marginTop,
            ...styles.container,
          },
        ]}
        onPress={() => dispatch(toggleModal(1))}>
        <P size={16} color={colors.text4}>
          {props.text}
        </P>
      </Pressable>
      {state === 1 && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => dispatch(toggleModal(0))}
          onDismiss={() => dispatch(toggleModal(0))}>
          {props.children}
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingVertical: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 5,
  },
});

export default CModal;
