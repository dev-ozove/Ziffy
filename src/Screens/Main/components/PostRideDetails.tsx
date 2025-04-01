import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  BackHandler,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackIcon from '../../../../assets/back_icon.svg';
import CancelModal from './CancelModal';
import {useAppDispatch, useAppSelector} from '../../../hooks/useRedux';
import {clearBookings} from '../../../Redux/Features/BookingsSlice';

import PickupLocationIcon from '../../../../assets/Pickup_icon.svg';

const {width, height} = Dimensions.get('window');

const PostRideDetails = ({
  onTrackRidePress,
  onCancelRidePress,
  bookingData,
}: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const Bookings = useAppSelector(state => state.bookings.bookings);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isPolicyModalVisible, setPolicyModalVisible] = useState(false); // New state for policy modal

  const PolicyDetailsModal = () => (
    <Modal
      visible={isPolicyModalVisible}
      transparent={true}
      animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cancellation Policy</Text>
          <Text style={styles.modalText}>
            Cancellations made seven days or less before a trip are not eligible
            for a refund. For cancellations made more than seven days in
            advance, a 50% refund will be provided. No-shows will be charged the
            full amount.
          </Text>
          <Pressable
            style={styles.modalCloseButton}
            onPress={() => setPolicyModalVisible(false)}>
            <Text style={styles.modalCloseText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{marginBottom: 12}}>
          <View>
            <BackIcon />
          </View>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.roundedBox,
              {
                backgroundColor:
                  bookingData?.status?.statusCode === 0
                    ? '#F8AB1E'
                    : bookingData?.status?.statusCode === 1
                    ? '#04fb00'
                    : bookingData?.status?.statusCode === 2
                    ? '#001aff'
                    : bookingData?.status?.statusCode === 3
                    ? '#ff0000'
                    : '#fff',
              },
            ]}
          />
          <Text style={styles.statusText}>
            {bookingData?.status?.bookingStatus}
          </Text>
        </View>
        <Text style={styles.info}>
          Heads up, Zify is processing your request and sending confirmation
          shortly
        </Text>
        <Text style={styles.date}>{bookingData?.Date}</Text>
        <Text style={styles.order}>
          Order <Text style={{color: '#F8AB1E'}}>#{bookingData?.OrderId}</Text>
        </Text>

        <View style={styles.locationContainer}>
          <View style={styles.locationBox}>
            <PickupLocationIcon />
            <Text style={styles.locationText}>{bookingData?.To}</Text>
          </View>
          <View style={styles.locationBox}>
            <PickupLocationIcon />
            <Text style={styles.locationText}>{bookingData?.From}</Text>
          </View>
        </View>

        <View style={styles.vehicleContainer}>
          <Image
            source={{uri: bookingData?.bookedVehicle?.image}}
            style={styles.vehicleImage}
          />

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.vehicleType}>
              {bookingData?.bookedVehicle?.title}
            </Text>
            <Text style={styles.vehicleSeats}>
              {bookingData?.bookedVehicle?.details?.maximum_capacity} Seater
            </Text>
            <Text style={styles.vehiclePrice}>
              {bookingData?.bookedVehicle?.details?.per_person_price}/person
            </Text>
          </View>
        </View>

        <View style={styles.policyContainer}>
          <Text style={styles.policyTitle}>Cancellation policy</Text>
          <View style={styles.policyContainer1}>
            <Text style={styles.policyText}>
              Cancellations made seven days or less before a trip are not
              eligible for a refund
            </Text>
            <View style={styles.detailsButtonCON}>
              <TouchableOpacity
                onPress={() => setPolicyModalVisible(true)}
                style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {bookingData?.status?.statusCode != 0 && (
          <TouchableOpacity
            style={styles.trackButton}
            onPress={onTrackRidePress}>
            <Text style={styles.trackButtonText}>Track Ride</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.cancelButton}
          //   onPress={() => setModalVisible(true)}
          onPress={onCancelRidePress}>
          <Text style={styles.cancelButtonText}>Cancel Ride</Text>
        </TouchableOpacity>
      </View>
      {/* <CancelModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          console.log('Ride Canceled');
        }}
      /> */}
      <PolicyDetailsModal />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundedBox: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  info: {
    fontSize: 12,
    marginVertical: height * 0.01,
  },
  date: {
    marginVertical: 2,
    fontSize: 13,
    fontWeight: '700',
  },
  order: {
    fontSize: 13,
    color: '#F8AB1E',
    fontWeight: '700',
  },
  locationContainer: {
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 15,
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '700',
    color: 'Black',
  },
  location: {
    fontSize: width * 0.045,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleContainer: {
    width: '40%',
    paddingBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderColor: '#F8AB1E',
    backgroundColor: '#FFAF1933',
  },
  vehicleImage: {
    width: 114,
    height: 80,
    resizeMode: 'contain',
  },
  vehicleType: {
    marginTop: -10,
    fontSize: 16,
    fontWeight: '600',
  },
  vehicleSeats: {
    fontSize: 10,
    fontWeight: '500',
    color: '#767676',
  },
  vehiclePrice: {
    fontSize: 14,
    fontWeight: '600',
  },

  policyContainer1: {
    flexDirection: 'row',
    marginTop: 5,
  },
  policyTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  detailsButtonCON: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },

  totalPassengersCon: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: '#33333380',
    marginBottom: 10,
  },
  totalPassengers: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  passengerInput: {fontSize: 16, fontWeight: '400'},
  trackButton: {
    backgroundColor: '#F8AB1E',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  trackButtonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
  },
  cancelButton: {
    backgroundColor: '#FF000040',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: height * 0.01,
    borderWidth: 0.7,
    borderColor: '#FF0000',
  },
  cancelButtonText: {
    color: '#FF0000',
    fontSize: 24,
    fontWeight: '700',
  },

  // Updated policy container styles
  policyContainer: {
    backgroundColor: '#FFAF1933',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  policyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    backgroundColor: 'red',
  },
  policyText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '400',
    marginRight: 10,
  },
  detailsButton: {
    backgroundColor: '#F8AB1E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    width: '40%',
  },
  detailsButtonText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
  },

  // New modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 15,
  },
  modalCloseButton: {
    backgroundColor: '#F8AB1E',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  modalCloseText: {
    color: 'black',
    fontWeight: '600',
  },
});

export default PostRideDetails;
