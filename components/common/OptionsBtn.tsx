import { useState } from 'react';
import { Pressable, StyleSheet, Modal, View } from 'react-native';
import P from './P';

interface Props {
  text: string;
  modalTexts: Array<string>;
  modalActions: Array<() => any>;
}

const OptionsBtn = ({ text, modalTexts, modalActions }: Props): JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1, ...styles.container },
        ]}
        onPress={() => setShowModal(true)}>
        <P size={16} color="#28373E">
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
            <View style={styles.modalView}>
              {modalTexts.map((item, index) => (
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      ...styles.btn,
                    },
                  ]}
                  key={index}
                  onPress={modalActions[index]}>
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
    backgroundColor: '#E5EFF3',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '75%',
  },
  btn: {
    backgroundColor: '#E5EFF3',
    padding: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 5,
  },
});

export default OptionsBtn;
