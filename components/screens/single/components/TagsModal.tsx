import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { modal } from '../../../../helpers/ModalManager';
import { useAppSelector } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import { ModalType } from '../../../../types/modalsType';
import Btn from '../../../common/Btn';
import CModal from '../../../common/CModal';
import Input from '../../../common/Input';
import P from '../../../common/P';

/**
 * Modal for tags selection.
 *
 * @return {*}  {JSX.Element}
 */
const NoteModal = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

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
  const [editing, setEditing] = useState(false);
  const [tag, setTag] = useState('');

  const name: ModalType = 'tags';

  /**
   * Function to toggle selected tag.
   *
   * @param {number} index
   */
  const toggleTag = (index: number): void => {
    let temp = tags;

    temp[index].selected = !temp[index].selected;

    setTags(temp);
    setExtra(new Date());
  };

  /**
   * Function to remove selected tag.
   *
   * @param {number} index
   */
  const removeTag = (index: number): void => {
    let temp = tags;

    temp.splice(index, 1);

    setTags(temp);
    setExtra(new Date());
  };

  /**
   * Function to add specified tag.
   *
   * @param {string} name
   * @param {boolean} selected
   */
  const addTag = (): void => {
    let temp = tags;

    if (tag !== '') {
      temp.push({ name: tag, selected: false });

      setTags(temp);
      setExtra(new Date());
      setTag('');
    }
  };

  return (
    <CModal
      text={t.single16}
      name={name}
      styles={{
        backgroundColor: colors.background,
      }}
      textColor={colors.textBtn}>
      <Pressable style={styles.centeredView} onPress={() => modal.close(name)}>
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
              {t.single17}
            </P>
            {/* Editing button */}
            <Pressable onPress={() => setEditing(!editing)}>
              <P color={colors.textBtn}>{t.single16}</P>
            </Pressable>
          </View>
          {/* Add section */}
          {editing && (
            <View style={styles.addSection}>
              <Input value={tag} onChange={setTag} redux={false} />
              <Pressable
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    backgroundColor: colors.accent,
                    ...styles.deleteBtn,
                  },
                ]}
                onPress={() => addTag()}>
                <Ionicons name="add" size={32} color={colors.text4} />
              </Pressable>
            </View>
          )}
          {/* Tags */}
          <FlatList
            style={styles.list}
            data={tags}
            extraData={extra}
            ListHeaderComponent={<P>{t.single15}</P>}
            ItemSeparatorComponent={() => {
              return <View style={{ marginBottom: 10 }}></View>;
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.listItem}>
                  <Btn
                    text={item.name}
                    color={item.selected ? colors.accent : colors.text4}
                    bg={item.selected ? colors.text4 : colors.accent}
                    action={() => toggleTag(index)}
                  />
                  {/* Remove tag button */}
                  {editing && (
                    <Pressable
                      style={({ pressed }) => [
                        {
                          opacity: pressed ? 0.5 : 1,
                          backgroundColor: colors.accent,
                          ...styles.deleteBtn,
                        },
                      ]}
                      onPress={() => removeTag(index)}>
                      <Ionicons name="trash" size={32} color={colors.text4} />
                    </Pressable>
                  )}
                </View>
              );
            }}
          />
          <Btn
            text={t.miscSave}
            bg={colors.link}
            action={() => modal.close(name)}
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
    alignItems: 'center',
  },
  list: {
    height: '70%',
    width: '100%',
    marginTop: 15,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  deleteBtn: {
    width: 'auto',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  addSection: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default NoteModal;
