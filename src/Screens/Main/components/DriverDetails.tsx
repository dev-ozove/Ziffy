import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TripIcon from '../../../../assests/DriverProfile/TripIcon';
import CardIcon from '../../../../assests/DriverProfile/CardIcon';
import Share from 'react-native-share';
const {width} = Dimensions.get('window');

const DriverDetails = ({onCheckinPress}) => {
  const shareDetails = async () => {
    try {
      await Share.open({
        message:
          'Ride details: Driver - Brooklyn Simmons, Car - Toyota 15U - 4796',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.arrivalText}>Arriving In 3 Minutes</Text>
      <View style={styles.driverInfoContainer}>
        <Image
          source={require('../../../../assests/DriverProfile/svgviewer-png-output.png')} // Adjust the path as per your project structure
          style={styles.driverImage}
        />
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="gold" />
          <Text style={styles.rating}>4</Text>
        </View>

        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>Brooklyn Simmons</Text>
          <View style={styles.carDetailsContainer}>
            <Text style={styles.carDetails}>Toyota</Text>
            <Text style={styles.plateNumber}>15U - 4796</Text>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="phone" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="chat" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tripDetails}>
        <View style={styles.tripHeader}>
          <Text style={styles.tripLabel}>Your Trip</Text>
          <TouchableOpacity style={styles.shareButton} onPress={shareDetails}>
            <Icon name="share" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.tripStops}>
          <View style={styles.stop}>
            <TripIcon />
            <View style={styles.addressContainer}>
              <Text style={styles.stopText}>4578 Ranchview Dr. Rich</Text>
              <View
                style={{
                  borderWidth: 0.7,
                  marginBottom: 14,
                  borderColor: '#ccc',
                }}
              />
              <Text style={styles.stopText1}>1901 Thernridge Cir. Shiloh</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.paymentContainer}>
        {/* <Icon name="credit-card" size={24} color="#FFAF19" /> */}
        <CardIcon />

        <View style={styles.paymentDetails}>
          <Text style={styles.paymentText}>Card ending with 0123</Text>
          <Text style={styles.paymentSubText}>UPC Split fare</Text>
        </View>

        <Icon name="chevron-right" size={24} color="#313A48" />
      </View>

      <TouchableOpacity style={styles.checkInButton} onPress={onCheckinPress}>
        <Text style={styles.checkInText}>Check in</Text>
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
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },

  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 20,
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
    fontSize: 14,
    fontWeight: '700',
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
    bottom: 12,
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
  iconsContainer: {
    flexDirection: 'row',
    gap: 15,
  },

  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F1F2F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tripDetails: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
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
  shareButton: {
    paddingVertical: 5,
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
  addressContainer: {
    marginLeft: 8,
    width: '100%',
  },
  stopText: {
    fontSize: 14,
    color: '#141921',
    marginBottom: 12,
  },
  stopText1: {
    fontSize: 14,
    color: '#141921',
  },

  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,

    justifyContent: 'space-between',
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
});

export default DriverDetails;
