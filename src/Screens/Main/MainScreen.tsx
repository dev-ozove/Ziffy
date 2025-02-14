import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  Alert,
  Animated,
  Pressable,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Keyboard,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import PickupLocationIcon from '../../../assests/Pickup_icon.svg';
import {useOzove} from '../../Context/ozoveContext';
import {styles} from '../../Components/MainStyles';

import RewardsScreen from './components/RewardsScreen';

//Importing the images

import Header from './Header';
import {useAppSelector} from '../../hooks/useRedux';
import FinalBookingScreen from './components/FinalBookingScreen';
import {StripeProvider} from '@stripe/stripe-react-native';
import BookingDescription from './components/BookingDescription';
import BookingInputScreen from './components/BookingInputScreen';
import AddCardScreen from './components/AddCardScreen';
import {Additional_services, Vechicle_data} from '../../Config/constants';
import {Timestamp} from '@react-native-firebase/firestore';
import {ServiceState} from '../../Context/Types/ozove';

export default function MainScreen({navigation}: any) {
  const Bookings = useAppSelector(state => state.bookings.bookings);
  const [stripePublicKey, set_stripePublicKey] = useState<any>(null);
  const [location, setLocation] = useState({
    latitude: -31.9523,
    longitude: 115.8613,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(true);
  const [showNextScreen, setShowNextScreen] = useState<number>(1);
  const [contactDetails, set_contactDetails] = useState();
  const [notes, set_notes] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('Now');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(0);
  const [distance, setDistance] = useState<any>(null);
  const [duration, setDuration] = useState<any>(null);
  const [selecetedAdditonalServices, setSelectedAdditonalServices] = useState<
    number | null
  >(null);
  const [showCancilation, set_showCancilation] = useState(false);
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);
  const mapRef = useRef(null);
  const {width} = Dimensions.get('window');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const [pickupLocationSuggestions, setPickupLocationSuggestions] =
    useState<any>();
  const [dropoffLocationSuggestions, setDropoffLocationSuggestions] =
    useState<any>();
  const [showPickupMark, set_showPickupMark] = useState(false);
  const [showDropoffMark, set_showDropoffMark] = useState(false);
  const [vehiclePricing, setVehiclePricing] = useState<{
    van?: any;
    miniBus?: any;
    bus?: any;
  }>({
    van: {minimumFare: 0}, // Default values to prevent NaN
    miniBus: {minimumFare: 0},
    bus: {minimumFare: 0},
  });
  const [servicesState, setServicesState] = useState<{
    [key: number]: ServiceState;
  }>({});

  const [passengerCount, setPassengerCount] = useState(1);
  const [TotalPrice, setTotalPrice] = useState(0);

  // Import from the Ozove Context functions
  const {
    _handleBooking,
    _getStripePublishableKey,
    Generate_OrderID,
    ServerLoading,
    _getlocationSuggestions,
    _updateBookingData,
    bookingData,
    _update_BookingData,
  } = useOzove();

  useEffect(() => {
    // Add keyboard event listeners
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const toggleCancilationPolicyModel = () => {
    set_showCancilation(!showCancilation);
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // setLocation({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   latitudeDelta: 0.005,
        //   longitudeDelta: 0.005,
        // });
        setLoading(false);
      },
      error => {
        Alert.alert(
          'Error',
          `Failed to get your location: ${error.message}. Make sure your location is enabled.`,
        );
        // setLocation({
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // });
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            Alert.alert(
              'Permission Denied',
              'Location permission is required to show your current location on the map.',
            );
            setLoading(false);
          }
        } catch (err) {
          console.warn(err);
          setLoading(false);
        }
      } else {
        getCurrentLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const renderComponent = () => {
    {
      /*In Future All Cases Needs to convert in the */
    }
    switch (showNextScreen) {
      // case -1:
      //   return <AddCardScreen setShowNextScreen={setShowNextScreen} />;
      case 1:
        return (
          <>
            <View>
              <>
                <View style={{alignSelf: 'flex-start', marginLeft: 20}}>
                  <Text style={styles.titleText}>Ready to book a ride?</Text>
                </View>

                <View style={styles.inputRow}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      position: 'relative',
                    }}>
                    <View style={styles.iconContainer}>
                      <PickupLocationIcon />
                    </View>
                    <View style={{flex: 1, gap: 10}}>
                      <TextInput
                        ref={pickupInputRef}
                        style={styles.inputField}
                        placeholderTextColor={'#333'}
                        placeholder="Add pickup location"
                        value={pickupLocation}
                        onFocus={() => setActiveInput('pickup')}
                        onChangeText={text => {
                          setPickupLocation(text);
                          handleSuggestions(text, true);
                        }}
                      />
                      {pickupSuggestions?.length > 0 &&
                        activeInput === 'pickup' && (
                          <ScrollView
                            style={styles.suggestionsList}
                            keyboardShouldPersistTaps="handled"
                            nestedScrollEnabled={true}>
                            {pickupSuggestions.map((item, index) => (
                              <TouchableOpacity
                                key={index}
                                style={styles.suggestionItem}
                                onPress={() =>
                                  handleLocationSelect(item, true)
                                }>
                                <Text style={styles.suggestionText}>
                                  {item?.formatted}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        )}
                    </View>
                  </View>
                </View>

                {/* Dropoff Location Input */}
                <View style={styles.inputRow}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      position: 'relative',
                    }}>
                    <View style={styles.iconContainer}>
                      <PickupLocationIcon />
                    </View>
                    <View style={{flex: 1, gap: 10}}>
                      <TextInput
                        ref={dropoffInputRef}
                        style={styles.inputField}
                        placeholderTextColor={'#333'}
                        placeholder="Add Dropoff location"
                        value={dropoffLocation}
                        onFocus={() => setActiveInput('dropoff')}
                        onChangeText={text => {
                          setDropoffLocation(text);
                          handleSuggestions(text, false);
                        }}
                      />
                      {dropoffSuggestions?.length > 0 &&
                        activeInput === 'dropoff' && (
                          <ScrollView
                            style={styles.suggestionsList}
                            keyboardShouldPersistTaps="handled"
                            nestedScrollEnabled={true}>
                            {dropoffSuggestions.map((item, index) => (
                              <TouchableOpacity
                                key={index}
                                style={styles.suggestionItem}
                                onPress={() =>
                                  handleLocationSelect(item, false)
                                }>
                                <Text style={styles.suggestionText}>
                                  {item?.formatted}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        )}
                    </View>
                  </View>
                </View>
              </>
            </View>
            {pickupLocationSuggestions?.latitude &&
              pickupLocationSuggestions?.longitude &&
              dropoffLocationSuggestions?.longitude &&
              dropoffLocationSuggestions?.latitude && (
                <View
                  style={{
                    bottom: 0,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: '90%',
                      elevation: 5,
                    }}
                    onPress={() => {
                      //setShowNextScreen(showNextScreen + 1);
                      const formdata = [
                        {
                          key: 'From',
                          value: pickupLocation,
                        },
                        {
                          key: 'To',
                          value: dropoffLocation,
                        },
                        {
                          key: 'PickupCoordinates.lat',
                          value: pickupLocationSuggestions?.latitude,
                        },
                        {
                          key: 'DropoffCoordinates.lat',
                          value: dropoffLocationSuggestions?.latitude,
                        },
                        {
                          key: 'PickupCoordinates.long',
                          value: pickupLocationSuggestions?.longitude,
                        },
                        {
                          key: 'DropoffCoordinates.long',
                          value: dropoffLocationSuggestions?.longitude,
                        },

                        {
                          key: 'TimeStamp',
                          value: Timestamp.fromMillis(Date.now()),
                        },
                        {
                          key: 'createdAtDate',
                          value: new Date().toISOString().split('T')[0],
                        },
                      ];
                      _update_BookingData(formdata);
                      setShowNextScreen(showNextScreen + 1);
                    }}>
                    <View
                      style={{
                        backgroundColor: '#FFAF19',
                        padding: 10,
                        borderRadius: 12,
                        paddingVertical: 20,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#333',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        {'Next'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            <RewardsScreen />
          </>
        );
      case 2:
        return (
          <>
            <BookingInputScreen
              showNextScreen={showNextScreen}
              setShowNextScreen={setShowNextScreen}
              Additional_services={Additional_services}
              Vechicle_data={Vechicle_data}
              date={date}
              selecetedAdditonalServices={selecetedAdditonalServices}
              selectedTime={selectedTime}
              selectedVehicle={selectedVehicle}
              setDate={setDate}
              setSelectedAdditonalServices={setSelectedAdditonalServices}
              setSelectedTime={setSelectedTime}
              setSelectedVehicle={setSelectedVehicle}
              setShowDatePicker={setShowDatePicker}
              showDatePicker={showDatePicker}
              dropoffLocation={dropoffLocation}
              pickupLocation={pickupLocation}
              servicesState={servicesState}
              setServicesState={setServicesState}
              setVehiclePricing={setVehiclePricing}
              vehiclePricing={vehiclePricing}
              distance={distance}
              duration={duration}
            />

            {selectedVehicle !== null && selectedTime !== '' && date && (
              <View
                style={{
                  bottom: 0,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  style={{
                    width: '90%',
                    elevation: 5,
                  }}
                  onPress={() => {
                    //setShowNextScreen(showNextScreen + 1);
                    const formdata = [
                      {
                        key: 'selectedVehicle',
                        value: selectedVehicle,
                      },
                      {
                        key: 'Date',
                        value: date.toDateString(),
                      },
                      {
                        key: 'Time',
                        value: selectedTime,
                      },
                      {
                        key: 'selectedAdditonalServices',
                        value: selecetedAdditonalServices,
                      },
                      {
                        key: 'AdditionalServices',
                        value: servicesState,
                      },
                    ];
                    _update_BookingData(formdata);
                    setShowNextScreen(showNextScreen + 1);
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FFAF19',
                      padding: 10,
                      borderRadius: 12,
                      paddingVertical: 20,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      {'Next'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </>
        );
      case 3:
        return (
          <>
            <BookingDescription
              contactDetails={contactDetails}
              set_contactDetails={set_contactDetails}
              showNextScreen={showNextScreen}
              setShowNextScreen={setShowNextScreen}
              notes={notes}
              set_notes={set_notes}
              selectedVehicle={selectedVehicle}
              setPassenger_Count={setPassengerCount}
              passenger_Count={passengerCount}
            />

            {contactDetails !== '' ? (
              <View
                style={{
                  bottom: 0,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  style={{
                    width: '90%',
                    elevation: 5,
                  }}
                  onPress={() => {
                    //setShowNextScreen(showNextScreen + 1);
                    const formdata = [
                      {
                        key: 'contactDetails',
                        value: contactDetails,
                      },
                      {
                        key: 'driverNote',
                        value: notes,
                      },
                      {
                        key: 'PassengerCount',
                        value: passengerCount || 1,
                      },
                    ];
                    _update_BookingData(formdata);
                    setShowNextScreen(showNextScreen + 1);
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FFAF19',
                      padding: 10,
                      borderRadius: 12,
                      paddingVertical: 20,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      {'Review Booking'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'red'}}>
                  {'Please enter contact details'}
                </Text>
              </View>
            )}
          </>
        );
      case 4:
        return (
          <>
            <FinalBookingScreen
              ServerLoading={ServerLoading}
              Vechicle_data={Vechicle_data}
              selectedVehicle={selectedVehicle}
              setShowNextScreen={setShowNextScreen}
              set_showCancilation={set_showCancilation}
              showCancilation={showCancilation}
              showNextScreen={showNextScreen}
              toggleCancilationPolicyModel={toggleCancilationPolicyModel}
              vehiclePricing={vehiclePricing}
              setVehiclePricing={setVehiclePricing}
              distance={distance}
              duration={duration}
              setPassenger_Count={setPassengerCount}
              passenger_Count={passengerCount}
              additionalFeatures={servicesState}
            />
          </>
        );
    }
  };

  const getPayementKey = async () => {
    try {
      const key = await _getStripePublishableKey();
      if (key !== undefined) {
        set_stripePublicKey(key);
      } else {
        console.warn('Stripe Key is undefined');
      }
    } catch (error) {
      console.error('Error in getPayementKey:', error);
    }
  };

  useEffect(() => {
    if (!stripePublicKey) {
      getPayementKey();
    }
  }, [stripePublicKey]);

  const handleSuggestions = async (querry: any, isPickup: any) => {
    if (isPickup) {
      const suggestions = await _getlocationSuggestions(querry);
      setPickupSuggestions(suggestions);
    } else {
      const suggestions = await _getlocationSuggestions(querry);
      setDropoffSuggestions(suggestions);
    }
  };

  const handleLocationSelect = (location: any, isPickup: any) => {
    if (isPickup) {
      setPickupLocation(location.formatted);
      const data = {
        latitude: location?.lat,
        longitude: location?.lon,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setPickupLocationSuggestions(data);
      set_showPickupMark(true);
      mapRef?.current?.animateToRegion(data, 1000);
      setPickupSuggestions([]);
    } else {
      setDropoffLocation(location.formatted);
      const data = {
        latitude: location?.lat,
        longitude: location?.lon,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setDropoffLocationSuggestions(data);
      set_showDropoffMark(true);
      mapRef?.current?.animateToRegion(data, 1000);
      setDropoffSuggestions([]);
    }
  };

  return (
    <>
      <StripeProvider publishableKey={stripePublicKey}>
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Pressable style={StyleSheet.absoluteFill}>
              <MapView
                ref={mapRef}
                style={styles.map}
                showsUserLocation={true}
                region={location}>
                {/* {location && <Marker coordinate={location} />} */}
                {showPickupMark && (
                  <Marker
                    coordinate={pickupLocationSuggestions}
                    title="Pickup Location"
                    pinColor="green"
                  />
                )}

                {/* Dropoff Marker */}
                {showDropoffMark && (
                  <Marker
                    coordinate={dropoffLocationSuggestions}
                    title="Dropoff Location"
                    pinColor="red"
                  />
                )}

                {showDropoffMark && showPickupMark ? (
                  <MapViewDirections
                    origin={pickupLocationSuggestions}
                    destination={dropoffLocationSuggestions}
                    apikey="AIzaSyBG43qB1FDkLoxOQyJXWkzvw7VmbX5iHNY" // Corrected prop name
                    strokeColor="#FFAF19"
                    strokeWidth={4}
                    onReady={result => {
                      console.log(`Distance: ${result.distance} km`);
                      console.log(`Duration: ${result.duration} min`);
                      setDuration(result.duration);
                      setDistance(result.distance);
                    }}
                    onError={errorMessage => {
                      console.error('Directions error:', errorMessage);
                    }}
                  />
                ) : null}
              </MapView>
            </Pressable>
          )}

          {/*Condition to render the header and search bar on the top */}

          <Header
            navigation={navigation}
            handleLocationSelect={handleLocationSelect}
          />

          {/*Conditonal render for the booking components */}
          {!isKeyboardVisible && Bookings?.length > 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Bookings')}
              style={{
                flexDirection: 'row',
                marginTop: showNextScreen !== 1 ? -580 : -120,
                margin: 20,
              }}>
              <View
                style={{
                  borderRadius: 10,
                  height: 50,
                  elevation: 10,
                  flex: 1,
                  backgroundColor: '#FFAF19',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  {`You have ${Bookings?.length || 0} booking${
                    Bookings?.length === 1 ? '' : 's'
                  }`}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {/* Action Sheet */}
          <Animated.View
            style={[
              styles.actionSheet,
              {
                height:
                  showNextScreen !== 1
                    ? showNextScreen === 3
                      ? '60%'
                      : '80%'
                    : '55%',
              },
            ]}>
            <View style={styles.sheetHandle} />

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.sheetContent}>
              {renderComponent()}
            </ScrollView>
          </Animated.View>
        </View>
      </StripeProvider>
    </>
  );
}
