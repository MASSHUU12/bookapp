import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { toggleModal } from '../../../../features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import { ModalType } from '../../../../types/modalsType';
import Btn from '../../../common/Btn';
import CModal from '../../../common/CModal';
import P from '../../../common/P';

/**
 * Modal for tags editing.
 *
 * @return {*}  {JSX.Element}
 */
const NoteModal = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const dispatch = useAppDispatch();

  let testData = [
    {
      name: 'Computer Science',
      selected: false,
    },
    {
      name: 'Romance',
      selected: false,
    },
    {
      name: 'Social interaction',
      selected: false,
    },
    {
      name: 'Interpersonal relations',
      selected: false,
    },
    {
      name: 'Game theory',
      selected: false,
    },
  ];

  const [tags, setTags] = useState(testData);
  const [extra, setExtra] = useState(new Date());

  const name: ModalType = 'tags';

  /**
   * Function to toggle selected tags.
   *
   * @param {number} index
   */
  const toggleTag = (index: number): void => {
    let temp = tags;

    temp[index].selected = !temp[index].selected;

    setTags(temp);
    setExtra(new Date());
  };

  return (
    <CModal
      text={t.single16}
      name={name}
      styles={{
        backgroundColor: colors.background,
      }}
      textColor={colors.textBtn}>
      <Pressable
        style={styles.centeredView}
        onPress={() => dispatch(toggleModal({ name, value: 0 }))}>
        <View style={{ backgroundColor: colors.white, ...styles.modalView }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* Close */}
            <Ionicons name="close" size={32} color={colors.text4} />
            <P color={colors.text4}>{t.miscClose}</P>
          </View>
          {/* Header */}
          <View style={styles.header}>
            <P size={24} font="AndadaPro-Bold">
              Choose tags for this book
            </P>
            <P size={18} color={colors.link}>
              aaa
            </P>
          </View>
          {/* Tags */}
          <FlatList
            style={styles.list}
            data={tags}
            extraData={extra}
            ListHeaderComponent={<P>Your existing tags</P>}
            ItemSeparatorComponent={() => {
              return <View style={{ marginBottom: 10 }}></View>;
            }}
            renderItem={({ item, index }) => {
              return (
                <Btn
                  text={item.name}
                  color={item.selected ? colors.accent : colors.text4}
                  bg={item.selected ? colors.text4 : colors.accent}
                  action={() => toggleTag(index)}
                />
              );
            }}
          />
          <Btn
            text="Save"
            bg={colors.link}
            action={() => dispatch(toggleModal({ name, value: 0 }))}
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
  modalView: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 25,
    paddingHorizontal: 10,
    paddingBottom: 45,
    alignItems: 'flex-start',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    height: '70%',
    width: '100%',
    marginTop: 15,
  },
});

export default NoteModal;
