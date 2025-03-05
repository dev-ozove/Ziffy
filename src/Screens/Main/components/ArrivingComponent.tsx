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
const {width} = Dimensions.get('window');

const ArrivingComponent = ({carArrived, onReviewPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.arrivalText}>Track your journey</Text>
      <View style={styles.driverInfoContainer}>
        <Image
          source={require('../../../../assets/DriverProfile/svgviewer-png-output.png')}
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

        <View style={styles.containerText}>
          <Text style={styles.etaText}>ETA 20 mins</Text>
          <Text style={styles.distanceText}>Remaining 10 km</Text>
        </View>
      </View>
      {carArrived && (
        <TouchableOpacity style={styles.checkInButton} onPress={onReviewPress}>
          <Text style={styles.checkInText}>Review</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 50,
  },
  arrivalText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },

  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
  etaText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  distanceText: {
    fontSize: 12,
    color: '#141921',
  },
  containerText: {
    flexDirection: 'column',
  },
});

export default ArrivingComponent;
