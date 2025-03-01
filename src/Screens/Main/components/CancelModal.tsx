import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CancelModal = ({isVisible, onClose, onConfirm}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Cancel Booking</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <Text style={styles.message}>This action cannot be undone.</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Text style={styles.backText}>Back To Booking</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: 3,
    backgroundColor: '#ccc',
  },
  message: {
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  backButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    backgroundColor: '#FFAF1926',
    borderColor: '#E4B95B',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  backText: {
    fontSize: 19,
    fontWeight: '600',
    color: 'black',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 19,
    fontWeight: '600',
    color: 'red',
  },
});

export default CancelModal;
