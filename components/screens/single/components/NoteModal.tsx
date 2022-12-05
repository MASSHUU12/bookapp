import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useAppDispatch, useAppSelector, useGlobalState } from 'hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { toggleModal } from 'features/modal/modalSlice';
import { t } from 'i18n/strings';
import { modal } from 'helpers/ModalManager';
import sql from 'services/sql/sql';
import { commonStyles } from 'styles/commonStyles';

import { DetailedBookType } from 'types/detailedBookType';
import { ModalType } from 'types/modalsType';

import Btn from '@common/Btn';
import CModal from '@common/CModal';
import P from '@common/P';

interface Props {
  book: DetailedBookType;
}

/**
 * Modal for note input.
 *
 * @return {*}  {JSX.Element}
 */
const NoteModal = ({ book }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const dispatch = useAppDispatch();
  const [_, refresh] = useGlobalState();
  const [noteText, setNoteText] = useState('');

  const onSave = () => {
    sql.updateBookDetails(
      {
        book_key: book.key,
        field: 'user_notes',
        value: noteText,
      },
      () => {
        refresh(1);
        dispatch(toggleModal({ name, value: 0 }));
      },
    );
  };

  useEffect(() => {
    setNoteText(book.user_notes);
  }, []);

  const name: ModalType = 'note';
  const limit = 2048;

  return (
    <CModal
      text={t.single4}
      name={name}
      styles={{
        backgroundColor: colors.background,
      }}
      textColor={colors.textBtn}>
      <Pressable style={styles.centeredView} onPress={() => modal.close(name)}>
        <View
          style={{
            backgroundColor: colors.white,
            ...commonStyles.basicModal,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Ionicons name="close" size={32} color={colors.text4} />
            <P color={colors.text4}>{t.miscClose}</P>
          </View>
          <P>{t.single14}</P>
          <P color={colors.text2} size={14}>
            {book.title}
          </P>
          <TextInput
            style={{
              backgroundColor: colors.surface,
              color: colors.text4,
              ...styles.input,
            }}
            textAlignVertical="top"
            multiline
            value={noteText}
            onChangeText={textFromInput => setNoteText(textFromInput)}
            maxLength={limit}
          />
          <P
            color={colors.text2}
            size={12}
            styles={styles.charactersNumber}>{`${
            noteText ? noteText.length : 0
          }/${limit}`}</P>
          <Btn
            text={t.miscSave}
            action={() => {
              onSave();
              modal.close(name);
            }}
          />
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
  btn: {
    paddingVertical: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 5,
  },
  input: {
    width: '100%',
    minHeight: '50%',
    marginVertical: 15,
    borderRadius: 10,
    padding: 10,
  },
  charactersNumber: {
    position: 'absolute',
    bottom: '15%',
    right: 20,
  },
});

export default NoteModal;
