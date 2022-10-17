import { Pressable, StyleSheet, View } from 'react-native';
import { toggleModal } from '../../../../features/modal/modalSlice';
import { useAppDispatch } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import { ModalType } from '../../../../types/modals';
import CModal from '../../../common/CModal';
import P from '../../../common/P';

const NoteModal = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const name: ModalType = 'note';

  return (
    <CModal text={t.single4} name={name}>
      <Pressable
        style={styles.centeredView}
        onPress={() => dispatch(toggleModal({ name, value: 0 }))}>
        <P>aaa</P>
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

export default NoteModal;
