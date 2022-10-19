import { Pressable, StyleSheet, View } from 'react-native';
import { modal } from '../../helpers/ModalManager';
import { useAppSelector } from '../../hooks';
import { ModalType } from '../../types/modalsType';
import CModal from './CModal';
import SlimBtn from './SlimBtn';

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

  return (
    <CModal text={text} name={name}>
      <Pressable style={styles.centeredView} onPress={() => modal.close(name)}>
        <View style={{ backgroundColor: colors.white, ...styles.modalView }}>
          {modalTexts.map((item, index) => (
            <SlimBtn
              text={item}
              key={index}
              action={() => {
                modalActions[index]();
                modal.close(name);
              }}
            />
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
