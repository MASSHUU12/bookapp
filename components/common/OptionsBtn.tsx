import { Pressable, StyleSheet, View } from 'react-native';
import { modal } from 'helpers/ModalManager';
import { useAppSelector } from 'hooks';
import { commonStyles } from 'styles/commonStyles';
import { ModalType } from 'types/modalsType';
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
const OptionsBtn: React.FunctionComponent<Props> = ({
  text,
  modalTexts,
  modalActions,
  name,
}: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <CModal text={text} name={name}>
      <Pressable style={styles.centeredView} onPress={() => modal.close(name)}>
        <View
          style={{ backgroundColor: colors.white, ...commonStyles.basicModal }}>
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
});

export default OptionsBtn;
