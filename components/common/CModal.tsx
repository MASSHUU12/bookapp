import { useEffect } from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { toggleModal } from '../../features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ModalType } from '../../types/modalsType';
import P from './P';

interface Props {
  text: string;
  marginTop?: number;
  children?: JSX.Element;
  name: ModalType;
  styles?: Object;
  textColor?: string;
}

/**
 * General-purpose modal, prepared to store all kinds of components.
 *
 * @param {Props} props
 * @return {*}  {JSX.Element}
 */
const CModal = (props: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const state = useAppSelector(state => state.modal.value[props.name]);

  const dispatch = useAppDispatch();

  const setStyles = (): Object => {
    if (props.styles !== undefined) return { ...props.styles };

    return {
      backgroundColor: colors.optionsBtn,
      marginTop: props.marginTop,
      ...styles.container,
    };
  };

  useEffect(() => {
    console.log(props.name + ' ' + state);
  }, []);

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            ...setStyles(),
          },
        ]}
        onPress={() => dispatch(toggleModal({ name: props.name, value: 1 }))}>
        <P size={16} color={props.textColor ? props.textColor : colors.text4}>
          {props.text}
        </P>
      </Pressable>
      {state === 1 && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() =>
            dispatch(toggleModal({ name: props.name, value: 0 }))
          }
          onDismiss={() =>
            dispatch(toggleModal({ name: props.name, value: 0 }))
          }>
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
