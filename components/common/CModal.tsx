import { useEffect } from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { modal } from '../../helpers/ModalManager';
import { useAppSelector } from '../../hooks';
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
        onPress={() => modal.open(props.name)}>
        <P color={props.textColor ? props.textColor : colors.text4}>
          {props.text}
        </P>
      </Pressable>
      {state === 1 && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => modal.close(props.name)}
          onDismiss={() => modal.close(props.name)}>
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
