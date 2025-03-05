import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TripIcon from '../../../../assets/DriverProfile/TripIcon';
import CardIcon from '../../../../assets/DriverProfile/CardIcon';
import OfferIcon from '../../../../assets/DriverProfile/OfferIcon';
import Avatar from '../../../../assets/Avatar.svg';
import MinusIcon from '../../../../assets/DriverProfile/MinusIcon';
import PlusIcon from '../../../../assets/DriverProfile/PlusIcon';

const {width} = Dimensions.get('window');

const StartRideComponent = ({onProceed}) => {
  const [passengerCount, setPassengerCount] = useState(1);

  const increaseCount = () => setPassengerCount(passengerCount + 1);
  const decreaseCount = () =>
    passengerCount > 1 && setPassengerCount(passengerCount - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.arrivalText}>Enjoy Your Trip</Text>
      <Text style={styles.arrivalText1}>Driver Details</Text>
      <View style={styles.driverInfoContainer}>
        <Image
          source={require('../../../../assets/DriverProfile/svgviewer-png-output.png')} // Adjust the path as per your project structure
          style={styles.driverImage}
        />
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="gold" />
          <Text style={styles.rating}>4</Text>
        </View>

        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>Brooklyn Simmons</Text>
          <View style={styles.carDetailsContainer}>
            <Text style={styles.carDetails}>Supra</Text>
            <Text style={styles.plateNumber}>15U - 4796</Text>
          </View>
        </View>
      </View>
      <View style={styles.tripDetails}>
        <View style={styles.tripHeader}>
          <Text style={styles.arrivalText1}>Trip Details</Text>
        </View>
        <View style={styles.tripStops}>
          <View style={styles.stop}>
            <TripIcon />
            <View style={styles.addressContainer}>
              <Text style={styles.stopText}>RAC Arena</Text>
              <View style={styles.divider} />
              <Text style={styles.stopText1}>1901 Thernridge Cir. Shiloh</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.arrivalText1}>Vehicle type</Text>
      <View style={styles.vehicleContainer}>
        <Text style={styles.title}>Small Van</Text>
        <View style={styles.priceRow}>
          <OfferIcon />
          <Text style={styles.price}>$7.45</Text>
          <Text style={styles.perPerson}>Per Person</Text>
          <Image
            source={require('../../../../assets/Vechicles/VITO_large_1.png')}
            style={styles.vehicleImage}
          />
        </View>
      </View>

      {/* Payment Card */}
      <View style={styles.paymentContainer}>
        <Text style={styles.title1}>Payment</Text>
        <View style={styles.paymentRow}>
          <Avatar />
          <View>
            <Text style={styles.paymentType}>Personal</Text>
            <Text style={styles.cardInfo}>Visa 0493</Text>
          </View>
          <Icon
            name="chevron-right"
            size={24}
            color="gray"
            style={styles.arrowIcon}
          />
        </View>
      </View>

      <Text style={styles.passengerText}>
        How many Passengers are you paying for
      </Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={decreaseCount} style={styles.counterButton}>
          <MinusIcon />
        </TouchableOpacity>
        <Text style={styles.passengerCount}>{passengerCount}</Text>
        <TouchableOpacity onPress={increaseCount} style={styles.counterButton}>
          <PlusIcon />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={onProceed}>
        <Text style={styles.startButtonText}>Start your Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: width * 0.09,
    width: width - 50,
  },
  arrivalText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  arrivalText1: {
    fontSize: 16,
    fontWeight: '500',
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: '#ccc',
  },
  driverImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  carDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  carDetails: {
    fontSize: 14,
    color: '#313A48',
  },
  plateNumber: {
    backgroundColor: '#FFAF19',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
  },
  ratingContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    left: 11,
    bottom: 5,
    paddingHorizontal: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  rating: {
    marginLeft: 2,
    fontSize: 14,
    fontWeight: 'bold',
  },

  tripDetails: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    width: '100%',
    paddingVertical: 10,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tripLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  addressContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
    marginLeft: 15,
    gap: 8,
  },
  stopText: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  stopText1: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  divider: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    marginVertical: 8,
  },

  tripStops: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  stop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentDetails: {
    flex: 1,
    marginLeft: 10,
  },
  paymentText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#141921',
    marginBottom: 3,
  },
  paymentSubText: {
    fontSize: 12,
    color: '#313A48',
  },
  checkInButton: {
    backgroundColor: '#F8AB1E',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  checkInText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#141921',
  },

  vehicleContainer: {
    backgroundColor: '#FEF3D6',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#F0C674',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  paymentContainer: {
    backgroundColor: '#FEF3D6',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0C674',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  title1: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 6,
  },
  perPerson: {
    fontSize: 10,
    color: 'gray',
    marginLeft: 6,
    marginTop: 6,
  },
  vehicleImage: {
    width: '40%',
    height: 45,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8AB1E',
    marginLeft: 12,
  },
  cardInfo: {
    fontSize: 14,
    color: '#8C8B8B',
    marginLeft: 12,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  passengerText: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 12,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  counterButton: {
    padding: wp('2%'),
  },
  passengerCount: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: wp('5%'),
  },
  startButton: {
    backgroundColor: '#FFAF19',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#141921',
  },
});

export default StartRideComponent;
