import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mergeTags } from '../../../../helpers/helpers';
import { modal } from '../../../../helpers/ModalManager';
import { useAppSelector, useGlobalState } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import sql from '../../../../services/sql/sql';
import { DetailedBookType } from '../../../../types/detailedBookType';
import { ModalType } from '../../../../types/modalsType';
import Btn from '../../../common/Btn';
import CModal from '../../../common/CModal';
import Input from '../../../common/Input';
import P from '../../../common/P';

interface Props {
  book: DetailedBookType;
}

interface TagType {
  id: number;
  name: string;
  selected: boolean;
}

/**
 * Modal for tags selection.
 *
 * @return {*}  {JSX.Element}
 */
const NoteModal = ({ book }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  const [tags, setTags] = useState<Array<TagType>>([]);
  const [extra, setExtra] = useState(new Date());
  const [editing, setEditing] = useState(false);
  const [tag, setTag] = useState('');
  const [onRefresh, refresh] = useGlobalState();

  useEffect(() => {
    sql.getAllTags(tagsFromSql => {
      const mergedTags = mergeTags({
        bookTags: JSON.parse(book.user_tags),
        allTags: tagsFromSql,
      });

      setTags(mergedTags);
    });
  }, [onRefresh, book]);

  const name: ModalType = 'tags';

  /**
   * Function to toggle selected tag.
   *
   * @param {number} index
   */
  const onTagPress = (passedTag: TagType): void => {
    if (passedTag.selected === false) {
      sql.updateBookTags({ key: book.key, tags: [passedTag.name] }, () => {
        refresh(1);
      });
    } else {
      console.log('should remove tag');
    }
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
  const addTag = () => {
    sql.addTag(tag, () => {
      refresh(1);
    });
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
                    action={() => onTagPress(item)}
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
