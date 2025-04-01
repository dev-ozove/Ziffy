import React, {useRef, useState, useEffect, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import {GestureHandlerRootView, Pressable} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import MapView, {Marker} from 'react-native-maps';
import {useAppDispatch} from '../../hooks/useRedux';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';
import PostRideDetails from './components/PostRideDetails';
import DriverDetails from './components/DriverDetails';
import CancelModal from './components/CancelModal';
import {clearBookings} from '../../Redux/Features/BookingsSlice';
import StartRideComponent from './components/StartRideComponent';
import ArrivingComponent from './components/ArrivingComponent';
import ReviewComponent from './components/ReviewComponent';
import polyline from '@mapbox/polyline';
import MapViewDirections from 'react-native-maps-directions';

const API_KEY = 'AIzaSyBG43qB1FDkLoxOQyJXWkzvw7VmbX5iHNY'; // Valid key

const BookingStatus = ({route}: any) => {
  const {bookingData, source} = route.params || {};
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Debugging logs
  console.log('Received bookingData:', bookingData);

  const [routeState, setRouteState] = useState({
    loading: true,
    error: null,
    coordinates: [],
  });
  const [showPostRide, setShowPostRide] = useState(true);
  const [showStartRide, setShowStartRide] = useState(false);
  const [showReview, setReview] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // Modified coordinate parsing with distinct defaults
  const {pickup, dropoff} = useMemo(() => {
    try {
      const parseCoord = (value: any, type: 'lat' | 'lng') => {
        const num = Number(value);
        if (isNaN(num)) throw new Error(`Invalid ${type} value`);
        return num;
      };

      console.log({
        pickup: {
          latitude: parseCoord(bookingData?.PickupCoordinates?.lat, 'lat'),
          longitude: parseCoord(bookingData?.PickupCoordinates?.long, 'lng'),
        },
        dropoff: {
          latitude: parseCoord(bookingData?.DropoffCoordinates?.lat, 'lat'),
          longitude: parseCoord(bookingData?.DropoffCoordinates?.long, 'lng'),
        },
      });

      return {
        pickup: {
          latitude: parseCoord(bookingData?.PickupCoordinates?.lat, 'lat'),
          longitude: parseCoord(bookingData?.PickupCoordinates?.long, 'lng'),
        },
        dropoff: {
          latitude: parseCoord(bookingData?.DropoffCoordinates?.lat, 'lat'),
          longitude: parseCoord(bookingData?.DropoffCoordinates?.long, 'lng'),
        },
      };
    } catch (error) {
      console.error('Error parsing coordinates:', error);
      Alert.alert('Error', 'Invalid location data, showing default locations');
      return {
        pickup: {latitude: -31.9523, longitude: 115.8613}, // Perth coordinates
        dropoff: {latitude: -32.0523, longitude: 115.8813}, // Different default
      };
    }
  }, [bookingData]);

  // Update map view
  useEffect(() => {
    const coords =
      routeState.coordinates.length > 0
        ? routeState.coordinates
        : [
            {latitude: pickup.latitude, longitude: pickup.longitude},
            {latitude: dropoff.latitude, longitude: dropoff.longitude},
          ];

    mapRef.current?.fitToCoordinates(coords, {
      edgePadding: {top: 50, right: 50, bottom: 300, left: 50},
      animated: true,
    });
  }, [routeState, pickup, dropoff]);

  const snapPoints = useMemo(
    () =>
      showStartRide
        ? ['30%']
        : showPostRide
        ? ['70%', '30%']
        : ['60%', '30%', '5%'],
    [showPostRide, showStartRide],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={styles.container}>
        <View
          style={{
            flex: 1,
          }}>
          <Pressable style={StyleSheet.absoluteFill}>
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={{
                ...pickup,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {/* Permanent test marker */}
              <Marker
                coordinate={{
                  latitude: -31.9523,
                  longitude: 115.8613,
                }}
                title="PERMANENT TEST MARKER"
                pinColor="black"
                tracksViewChanges={true}
              />

              {/* Pickup Marker */}
              <Marker
                coordinate={pickup}
                title="Pickup Location"
                pinColor="#4CAF50"
              />

              {/* Dropoff Marker */}
              <Marker
                coordinate={dropoff}
                title="Dropoff Location"
                pinColor="#F44336"
              />

              {/* Directions Renderer */}
              <MapViewDirections
                origin={pickup}
                destination={dropoff}
                apikey={API_KEY}
                strokeWidth={4}
                strokeColor="#2196F3"
                onReady={result => {
                  mapRef.current?.fitToCoordinates(result.coordinates, {
                    edgePadding: {top: 50, right: 50, bottom: 300, left: 50},
                    animated: true,
                  });
                }}
                onError={errorMessage => {
                  console.log('Directions error:', errorMessage);
                  Alert.alert('Routing Error', 'Could not calculate route');
                }}
              />
            </MapView>
          </Pressable>

          {/* Bottom Sheet Content */}
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            enableContentPanningGesture
            enableOverDrag={false}>
            <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
              {showReview ? (
                <ReviewComponent
                  backpress={() => setReview(false)}
                  ReviewPress={() => {
                    setReview(false);
                    navigation.navigate('Main');
                  }}
                />
              ) : showStartRide ? (
                <ArrivingComponent
                  carArrived
                  onReviewPress={() => setReview(true)}
                />
              ) : source === 'Checkin' ? (
                <StartRideComponent onProceed={() => setShowStartRide(true)} />
              ) : showPostRide ? (
                <PostRideDetails
                  bookingData={bookingData}
                  onTrackRidePress={() => setShowPostRide(false)}
                  onCancelRidePress={() => setModalVisible(true)}
                />
              ) : (
                <DriverDetails
                  onCheckinPress={() => navigation.navigate('QRScanner')}
                />
              )}
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  mapContainer: {
    height: '80%', // Reserve 60% of the screen for the map
    width: '100%',
  },
  map: {
    flex: 1, // Fill the mapContainer
    ...StyleSheet.absoluteFillObject,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 10,
    color: '#2196F3',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});

export default BookingStatus;
