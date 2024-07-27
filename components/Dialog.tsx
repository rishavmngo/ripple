import React from 'react';
import {Modal, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const Dialog = ({visible, onClose, children}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dialogContainer}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#141414',
    borderRadius: 10,
    elevation: 5,
  },
});

export default Dialog;
