import { useState } from 'react';
import { Pressable, StyleSheet, Modal, View } from 'react-native';
import { useAppSelector } from '../../hooks';
import P from './P';

interface Props {
  text: string;
  modalTexts: Array<string>;
  modalActions: Array<() => any>;
}

const OptionsBtn = ({ text, modalTexts, modalActions }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            backgroundColor: colors.optionsBtn,
            ...styles.container,
          },
        ]}
        onPress={() => setShowModal(true)}>
        <P size={16} color={colors.text4}>
          {text}
        </P>
      </Pressable>
      {showModal && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => setShowModal(false)}
          onDismiss={() => setShowModal(false)}>
          <Pressable
            style={styles.centeredView}
            onPress={() => setShowModal(false)}>
            <View
              style={{ backgroundColor: colors.white, ...styles.modalView }}>
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
                    setShowModal(false);
                  }}>
                  <P>{item}</P>
                </Pressable>
              ))}
            </View>
          </Pressable>
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
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
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
