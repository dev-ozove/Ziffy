import React, {useEffect, useRef, useState} from 'react';
import {useAppSelector} from '../../../../hooks/useRedux';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useOzove} from '../../../../Context/ozoveContext';
import Geolocation from '@react-native-community/geolocation';
import {styles} from '../../../../Components/MainStyles';
import PickupLocationIcon from '../../../../../assets/Pickup_icon.svg';
import RewardsScreen from '../../components/RewardsScreen';
import BookingInputScreen from '../../components/BookingInputScreen';
import {Additional_services, Vechicle_data} from '../../../../Config/constants';
import BookingDescription from '../../components/BookingDescription';
import FinalBookingScreen from '../../components/FinalBookingScreen';
import {StripeProvider} from '@stripe/stripe-react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Header from '../../Header';
import LoaderZiffy from '../../components/Loader/LoaderZiffy';
import {Timestamp} from '@react-native-firebase/firestore';

interface LocationData {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface LocationSuggestion {
  formatted: string;
  lat: number;
  lon: number;
}

interface BookingInputScreenPropsBase {
  showNextScreen: number;
  setShowNextScreen: (screen: number) => void;
  Additional_services: any[];
  Vechicle_data: any[];
  selectedVehicle: number | null;
  setSelectedVehicle: (vehicle: number | null) => void;
  pickupLocation: string;
  dropoffLocation: string;
  distance: number | null;
  duration: number | null;
  servicesState: any;
  setServicesState: (state: any) => void;
  vehiclePricing: any;
  setVehiclePricing: (pricing: any) => void;
  passengerCount: number;
  setPassengerCount: (count: number) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

interface BookingInputScreenProps extends BookingInputScreenPropsBase {
  setShowDatePicker: (show: boolean) => void;
  date: Date;
  showDatePicker: boolean;
  setDate: (date: Date) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selecetedAdditonalServices: number | null;
  setSelectedAdditonalServices: (services: number | null) => void;
}

interface BookingDescriptionProps {
  contactDetails: any;
  set_contactDetails: (details: any) => void;
  showNextScreen: number;
  setShowNextScreen: (screen: number) => void;
  notes: string;
  set_notes: (notes: string) => void;
  setShowPaymentView: (show: boolean) => void;
  selectedVehicle: number | null;
  setPassenger_Count: (count: number) => void;
  passenger_Count: number;
}

interface ReviewBookingProps {
  ServerLoading: boolean;
  Vechicle_data: any[];
  Additional_services: any[];
  selectedVehicle: number | null;
  setSelectedVehicle: (vehicle: number | null) => void;
  pickupLocation: string;
  dropoffLocation: string;
  distance: number | null;
  duration: number | null;
  vehiclePricing: any;
  setVehiclePricing: (pricing: any) => void;
  passengerCount: number;
  setPassengerCount: (count: number) => void;
  servicesState: any;
  setServicesState: (state: any) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  toggleCancilationPolicyModel: () => void;
}

interface LocationSuggestionResponse {
  formatted: string;
  lat: number;
  lon: number;
}

interface HeaderProps {
  navigation: any;
}

export default function Zen_MainScreen({navigation}: any) {
  const Bookings = useAppSelector(state => state.bookings.bookings);
  const [stripePublicKey, set_stripePublicKey] = useState<any>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNextScreen, setShowNextScreen] = useState<number>(1);
  const [contactDetails, set_contactDetails] = useState<any>();
  const [notes, set_notes] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('Now');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [activeInput, setActiveInput] = useState<'pickup' | 'dropoff' | null>(
    null,
  );
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(0);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [selecetedAdditonalServices, setSelectedAdditonalServices] = useState<
    number | null
  >(null);
  const [showCancilation, set_showCancilation] = useState(false);
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);
  const mapRef = useRef<MapView>(null);
  const {width} = Dimensions.get('window');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const [pickupLocationSuggestions, setPickupLocationSuggestions] =
    useState<LocationData | null>(null);
  const [dropoffLocationSuggestions, setDropoffLocationSuggestions] =
    useState<LocationData | null>(null);
  const [showPickupMark, set_showPickupMark] = useState(false);
  const [showDropoffMark, set_showDropoffMark] = useState(false);

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
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        setLoading(false);
      },
      error => {
        Alert.alert(
          'Error',
          `Failed to get your location: ${error.message}. Make sure your location is enabled.`,
        );
        setLocation({
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
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
              {...{
                showNextScreen,
                setShowNextScreen,
                Additional_services,
                Vechicle_data,
                selectedVehicle,
                setSelectedVehicle,
                pickupLocation,
                dropoffLocation,
                distance,
                duration,
                servicesState: {},
                setServicesState: () => {},
                vehiclePricing: {},
                setVehiclePricing: () => {},
                passengerCount: 1,
                setPassengerCount: () => {},
                isExpanded: false,
                setIsExpanded: () => {},
                setShowDatePicker,
                date,
                showDatePicker,
                setDate,
                selectedTime,
                setSelectedTime,
                selecetedAdditonalServices,
                setSelectedAdditonalServices,
              }}
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
              {...{
                contactDetails,
                set_contactDetails,
                showNextScreen,
                setShowNextScreen,
                notes,
                set_notes,
                setShowPaymentView: () => {},
                selectedVehicle,
                setPassenger_Count: () => {},
                passenger_Count: 1,
              }}
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
              {...{
                ServerLoading,
                Vechicle_data,
                Additional_services,
                selectedVehicle,
                setSelectedVehicle,
                pickupLocation,
                dropoffLocation,
                distance,
                duration,
                vehiclePricing: {},
                setVehiclePricing: () => {},
                passengerCount: 1,
                setPassengerCount: () => {},
                servicesState: {},
                setServicesState: () => {},
                isExpanded: false,
                setIsExpanded: () => {},
                toggleCancilationPolicyModel,
              }}
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

  const handleSuggestions = async (query: string, isPickup: boolean) => {
    const suggestions = await _getlocationSuggestions(query);
    if (!Array.isArray(suggestions)) return;

    const typedSuggestions = suggestions.map(
      (suggestion: LocationSuggestionResponse) => ({
        formatted: suggestion.formatted || '',
        lat: Number(suggestion.lat) || 0,
        lon: Number(suggestion.lon) || 0,
      }),
    );

    if (isPickup) {
      setPickupSuggestions(typedSuggestions);
    } else {
      setDropoffSuggestions(typedSuggestions);
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
      setDropoffSuggestions([]);
    }

    // Update map region to show both markers if both are set
    if (pickupLocationSuggestions && dropoffLocationSuggestions) {
      const region = {
        latitude:
          (pickupLocationSuggestions.latitude +
            dropoffLocationSuggestions.latitude) /
          2,
        longitude:
          (pickupLocationSuggestions.longitude +
            dropoffLocationSuggestions.longitude) /
          2,
        latitudeDelta:
          Math.abs(
            pickupLocationSuggestions.latitude -
              dropoffLocationSuggestions.latitude,
          ) * 1.5,
        longitudeDelta:
          Math.abs(
            pickupLocationSuggestions.longitude -
              dropoffLocationSuggestions.longitude,
          ) * 1.5,
      };
      mapRef?.current?.animateToRegion(region, 1000);
    } else {
      // If only one marker is set, center on that marker
      const markerData = isPickup
        ? pickupLocationSuggestions
        : dropoffLocationSuggestions;
      if (markerData) {
        mapRef?.current?.animateToRegion(markerData, 1000);
      }
    }
  };

  return (
    <>
      <StripeProvider publishableKey={stripePublicKey}>
        <View style={styles.container}>
          {loading ? (
            <LoaderZiffy />
          ) : (
            <Pressable style={StyleSheet.absoluteFill}>
              <MapView
                ref={mapRef}
                style={styles.map}
                showsUserLocation={true}
                region={location || undefined}>
                {showPickupMark && pickupLocationSuggestions && (
                  <Marker
                    coordinate={{
                      latitude: pickupLocationSuggestions.latitude,
                      longitude: pickupLocationSuggestions.longitude,
                    }}
                    title="Pickup Location"
                    pinColor="green"
                  />
                )}

                {showDropoffMark && dropoffLocationSuggestions && (
                  <Marker
                    coordinate={{
                      latitude: dropoffLocationSuggestions.latitude,
                      longitude: dropoffLocationSuggestions.longitude,
                    }}
                    title="Dropoff Location"
                    pinColor="red"
                  />
                )}

                {showDropoffMark &&
                  showPickupMark &&
                  pickupLocationSuggestions &&
                  dropoffLocationSuggestions && (
                    <MapViewDirections
                      origin={{
                        latitude: pickupLocationSuggestions.latitude,
                        longitude: pickupLocationSuggestions.longitude,
                      }}
                      destination={{
                        latitude: dropoffLocationSuggestions.latitude,
                        longitude: dropoffLocationSuggestions.longitude,
                      }}
                      apikey={'AIzaSyBKmHJJyiyRLQhkWLIraHr-CHp5QSuY00Q'}
                      strokeColor="#FFAF19"
                      strokeWidth={4}
                      onReady={result => {
                        setDistance(result.distance);
                        setDuration(result.duration);
                        // Fit map to show the entire route
                        mapRef.current?.fitToCoordinates(result.coordinates, {
                          edgePadding: {
                            top: 50,
                            right: 50,
                            bottom: 50,
                            left: 50,
                          },
                          animated: true,
                        });
                      }}
                      onError={errorMessage => {
                        console.error('Directions error:', errorMessage);
                      }}
                    />
                  )}
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
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  {`You have ${Bookings?.length || 0} booking${
                    Bookings?.length === 1 ? '' : 's'
                  }`}
                </Text>
                <Text
                  style={{
                    color: '#d9f1ff',
                    fontSize: 10,
                    marginTop: 5,
                  }}>
                  Tap here to view all your bookings
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
