import { Pressable, StyleSheet, View } from 'react-native';
import { toggleModal } from '../../features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ModalType } from '../../types/modalsType';
import CModal from './CModal';
import P from './P';

interface Props {
  text: string;
  modalTexts: Array<string>;
  modalActions: Array<() => any>;
  name: ModalType;
}

/**
 * Modal suitable for button storage.
 *
 * @param {Props} { text, modalTexts, modalActions }
 * @return {*}  {JSX.Element}
 */
const OptionsBtn = ({
  text,
  modalTexts,
  modalActions,
  name,
}: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  const dispatch = useAppDispatch();

  return (
    <CModal text={text} name={name}>
      <Pressable
        style={styles.centeredView}
        onPress={() => dispatch(toggleModal({ name, value: 0 }))}>
        <View style={{ backgroundColor: colors.white, ...styles.modalView }}>
          {modalTexts.map((item, index) => (
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  backgroundColor: colors.optionsBtn,
                  ...styles.btn,
                },
              ]}
              key={index}
              onPress={() => {
                modalActions[index]();
                dispatch(toggleModal({ name, value: 0 }));
              }}>
              <P>{item}</P>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </CModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 25,
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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

export default OptionsBtn;
