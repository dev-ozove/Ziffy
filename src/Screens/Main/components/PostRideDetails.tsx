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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackIcon from '../../../../assests/back_icon.svg';
import CancelModal from './CancelModal';
import {useAppDispatch, useAppSelector} from '../../../hooks/useRedux';
import {clearBookings} from '../../../Redux/Features/BookingsSlice';

const {width, height} = Dimensions.get('window');

const PostRideDetails = ({onTrackRidePress, onCancelRidePress}) => {
  const [passengerCount, setPassengerCount] = useState('25');
  const [isModalVisible, setModalVisible] = useState(false);
  const Bookings = useAppSelector(state => state.bookings.bookings);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

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
          <View style={styles.roundedBox} />
          <Text style={styles.statusText}>Pending</Text>
        </View>
        <Text style={styles.info}>
          Heads up, Mark We're processing your request and sending confirmation
          shortly
        </Text>
        <Text style={styles.date}>14-Jan-2023 16:32</Text>
        <Text style={styles.order}>
          Order# <Text style={{color: '#F8AB1E'}}>zen4587</Text>
        </Text>

        <View style={styles.locationContainer}>
          <View style={styles.locationBox}>
            <Icon name="place" size={22} color="black" />
            <Text style={styles.locationText}>RAC Arena</Text>
          </View>
          <View style={styles.locationBox}>
            <Icon name="place" size={22} color="black" />
            <Text style={styles.locationText}>Airport</Text>
          </View>
        </View>

        <View style={styles.vehicleContainer}>
          <Image
            source={require('../../../../assests/Vechicles/VITO_large_1.png')}
            style={styles.vehicleImage}
          />

          <View>
            <Text style={styles.vehicleType}>Small Van</Text>
            <Text style={styles.vehicleSeats}>8 seater</Text>
            <Text style={styles.vehiclePrice}>$4.50</Text>
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
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.totalPassengersCon}>
          <Text style={styles.totalPassengers}>Total Passengers</Text>
          <TextInput
            style={styles.passengerInput}
            value={passengerCount}
            onChangeText={text => setPassengerCount(text)}
            keyboardType="numeric"
            editable={true}
          />
        </View>

        <TouchableOpacity style={styles.trackButton} onPress={onTrackRidePress}>
          <Text style={styles.trackButtonText}>Track Ride</Text>
        </TouchableOpacity>
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
          dispatch(clearBookings());
          setModalVisible(false);
          navigation.navigate('Main');
        }}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.01,
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
    backgroundColor: 'orange',
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
    height: '20%',
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
  policyContainer: {
    backgroundColor: '#FFAF1933',
    padding: 15,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
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
  policyText: {
    flex: 1.5,
    fontSize: 10,
    fontWeight: '400',
  },
  detailsButtonCON: {
    flex: 1,
  },
  detailsButton: {
    backgroundColor: '#F8AB1E',
    padding: width * 0.02,
    alignSelf: 'flex-end',
    borderRadius: 30,
  },
  detailsButtonText: {
    color: 'Black',
    fontSize: 10,
    fontWeight: '600',
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
});

export default PostRideDetails;
