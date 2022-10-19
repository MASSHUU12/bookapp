import { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mergeTags } from '../../../../helpers/helpers';
import { modal } from '../../../../helpers/ModalManager';
import { useAppSelector, useGlobalState } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import sql from '../../../../services/sql/sql';
import { commonStyles } from '../../../../styles/commonStyles';
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

  const onTagPress = (passedTag: TagType): void => {
    if (passedTag.selected === false) {
      sql.updateBookTags({ key: book.key, tags: [passedTag.name] }, () => {
        refresh(1);
      });
    } else {
      sql.removeTagFromBook({ key: book.key, tag: passedTag.name }, () => {
        refresh(1);
      });
    }
  };

  const removeTag = (passedTag: TagType): void => {
    return Alert.alert(
      `Are you sure?`,
      `This action will remove ${passedTag.name} from all books and remove the tag`,
      [
        {
          text: t.miscNo,
        },
        // The "Yes" button
        {
          text: t.miscYes,
          onPress: () => {
            sql.removeTag(passedTag.name, () => {
              refresh(1);
            });
          },
        },
      ],
    );
  };

  const addTag = () => {
    if (tag.length > 0) {
      sql.addTag(tag, () => {
        refresh(1);
      });

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
      <View style={styles.centeredView}>
        <View
          style={{ backgroundColor: colors.white, ...commonStyles.basicModal }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* Close */}
            <Pressable
              onPress={() => modal.close(name)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="close" size={32} color={colors.text4} />
              <P color={colors.text4}>{t.miscClose}</P>
            </Pressable>
          </View>
          {/* Header */}
          <View style={styles.header}>
            <P size={22} font="AndadaPro-Bold">
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
            ListHeaderComponent={
              <P styles={{ marginBottom: 15 }}>{t.single15}</P>
            }
            ItemSeparatorComponent={() => {
              return <View style={{ marginBottom: 10 }}></View>;
            }}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  style={{ ...commonStyles.flexCenter, ...styles.listItem }}>
                  <Btn
                    text={item.name}
                    color={item.selected ? colors.accent : colors.text4}
                    bg={item.selected ? colors.textBtn : colors.optionsBtn}
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
                      onPress={() => removeTag(item)}>
                      <Ionicons name="trash" size={32} color={colors.text4} />
                    </Pressable>
                  )}
                </View>
              );
            }}
          />
        </View>
      </View>
    </CModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    flexDirection: 'row',
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
