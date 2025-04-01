import React, {useRef, useState, useEffect, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {GestureHandlerRootView, Pressable} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import polyline from '@mapbox/polyline';
import MapViewDirections from 'react-native-maps-directions';
import {useAppDispatch} from '../../../../hooks/useRedux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './bookingStyles';
import Header from '../../Header';

import From_icon from '../../../../../assets/sidebar/bookings/from_icon.svg';
import To_icon from '../../../../../assets/sidebar/bookings/to_icon.svg';
import {useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';

const API_KEY = 'AIzaSyBG43qB1FDkLoxOQyJXWkzvw7VmbX5iHNY'; // Valid key

const CheckingScreen = ({route}: any) => {
  const {bookingDetails, source} = route.params || {};
  console.log('BookingDetails >>> ', bookingDetails);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {initPaymentSheet, presentPaymentSheet} = useStripe(); // Stripe methods
  const [loadingPayment, setLoadingPayment] = useState(false);

  // Debugging logs
  console.log('Received bookingDetails:', bookingDetails);

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
          latitude: parseCoord(bookingDetails?.PickupCoordinates?.lat, 'lat'),
          longitude: parseCoord(bookingDetails?.PickupCoordinates?.long, 'lng'),
        },
        dropoff: {
          latitude: parseCoord(bookingDetails?.DropoffCoordinates?.lat, 'lat'),
          longitude: parseCoord(
            bookingDetails?.DropoffCoordinates?.long,
            'lng',
          ),
        },
      });

      return {
        pickup: {
          latitude: parseCoord(bookingDetails?.PickupCoordinates?.lat, 'lat'),
          longitude: parseCoord(bookingDetails?.PickupCoordinates?.long, 'lng'),
        },
        dropoff: {
          latitude: parseCoord(bookingDetails?.DropoffCoordinates?.lat, 'lat'),
          longitude: parseCoord(
            bookingDetails?.DropoffCoordinates?.long,
            'lng',
          ),
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
  }, [bookingDetails]);

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

  const handleCheckInPayment = async () => {
    setLoadingPayment(true);

    try {
      const response = await axios.post(
        'https://ozove-backend.onrender.com/api/firestore/create-payment-intent',
        {
          amount: 5000,
          currency: 'usd',
          paymentMethodType: 'card',
          metadata: {
            userId: 'user_123',
            bookingId: 'booking_456',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Server response:', response.data);

      const clientSecret = response.data.paymentIntent.client_secret;
      const customerId = response.data.customerId;
      const ephemeralKeySecret = response.data.ephemeralKey;

      if (!clientSecret || !customerId || !ephemeralKeySecret) {
        throw new Error('Missing required data from backend');
      }

      const {error: initError} = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        customerId: customerId,
        customerEphemeralKeySecret: ephemeralKeySecret,
        merchantDisplayName: 'Zify',
      });

      if (initError) {
        throw new Error(
          `Payment sheet initialization failed: ${initError.message}`,
        );
      }

      const {error: paymentError} = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert('Payment Failed', paymentError.message);
      } else {
        Alert.alert('Success', 'Payment completed successfully!');
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert(
        'Error',
        'Something went wrong during payment. Please try again.',
      );
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={'#FFAF19'} />
      <GestureHandlerRootView style={styles.container}>
        <View
          style={{
            flex: 1,
          }}>
          <Header navigation={navigation} />
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
            snapPoints={['80%']}
            enablePanDownToClose={false}
            enableContentPanningGesture
            enableOverDrag={false}>
            <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.container}>
                <Text style={styles.arrivalText}>Zify is on the way</Text>
                <View style={styles.driverInfoContainer}>
                  <Image
                    source={require('../../../../../assets/DriverProfile/svgviewer-png-output.png')} // Adjust the path as per your project structure
                    style={styles.driverImage}
                  />
                  <View style={styles.driverDetails}>
                    <Text style={styles.driverName}>
                      {bookingDetails?.driver?.name}
                    </Text>
                    <View style={styles.carDetailsContainer}>
                      <Text style={styles.carDetails}>
                        {bookingDetails?.bookedVehicle?.title}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.tripDetails}>
                  <View style={styles.tripHeader}>
                    <Text style={styles.tripLabel}>Your Trip</Text>
                  </View>
                  <View style={styles.tripStops}>
                    <View style={styles.stop}>
                      {/* <TripIcon /> */}
                      <View style={styles.addressContainer}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <From_icon style={{marginRight: 10}} />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                            }}>
                            <Text style={styles.stopText}>
                              {bookingDetails?.From}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            borderWidth: 0.7,
                            marginBottom: 14,
                            borderColor: '#ccc',
                          }}
                        />

                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <To_icon style={{marginRight: 10}} />
                          </View>
                          <View style={{flex: 1}}>
                            <Text style={styles.stopText1}>
                              {bookingDetails?.To}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{marginVertical: 20}}>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: '#333'}}>
                    Vehicle Type
                  </Text>
                  <View
                    style={{
                      marginBottom: 10,
                      marginTop: 10,
                      backgroundColor: 'rgba(255, 175, 25, 0.2)',
                      borderWidth: 1,
                      borderColor: 'rgba(255, 175, 25, 1)',
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingHorizontal: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          paddingHorizontal: 10,
                        }}>
                        <View style={{flex: 1, paddingTop: 10}}>
                          <View>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                              {bookingDetails?.bookedVehicle?.title}
                            </Text>
                            <Text style={{fontSize: 12}}>
                              {
                                bookingDetails?.bookedVehicle?.details
                                  ?.Full_name
                              }
                            </Text>
                            <View style={{marginVertical: 10}}>
                              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                {`$ ${bookingDetails?.bookedVehicle?.details?.per_person_price}`}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={{flex: 1}}>
                        <Image
                          source={{uri: bookingDetails?.bookedVehicle?.image}}
                          style={{width: 'auto', height: 80}}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.paymentContainer}>
                  {/* <CardIcon /> */}
                  <View style={styles.paymentDetails}>
                    <Text style={styles.paymentText}>
                      Card ending with 0123
                    </Text>
                    <Text style={styles.paymentSubText}>UPC Split fare</Text>
                  </View>

                  <Icon name="chevron-right" size={24} color="#313A48" />
                </View>

                <TouchableOpacity
                  style={styles.checkInButton}
                  onPress={handleCheckInPayment}
                  disabled={loadingPayment}>
                  {loadingPayment ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.checkInText}>Check in</Text>
                  )}
                </TouchableOpacity>
              </View>
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default CheckingScreen;
