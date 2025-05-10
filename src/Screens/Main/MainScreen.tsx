import React, {useEffect, useState, useRef, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import PickupLocationIcon from '../../../assets/Pickup_icon.svg';
import ScanIcon from '../../../assets/Scanner/ScanIcon.svg';
import {useOzove} from '../../Context/ozoveContext';
import {styles} from '../../Components/MainStyles';

import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import Header from './Header';
import {useAppSelector} from '../../hooks/useRedux';
import FinalBookingScreen from './components/FinalBookingScreen';
import {StripeProvider} from '@stripe/stripe-react-native';
import BookingInputScreen from './components/BookingInputScreen';
import {Additional_services, Vechicle_data} from '../../Config/constants';
import {Timestamp} from '@react-native-firebase/firestore';
import {ServiceState} from '../../Context/Types/ozove';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BookingCarousel from './components/BookingCarousel';

import Logo from '../../../assets/Logo_1.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoaderZiffy from './components/Loader/LoaderZiffy';
import {useAlert} from '../../Context/AlertContext';
import {useDispatch, useSelector} from 'react-redux';
import {selectPerthLocation} from '../../Redux/Store/Store';
import {setPerthLocation} from '../../Redux/Features/BookingsSlice';

export default function MainScreen({navigation}: any) {
  const Bookings = useAppSelector(state => state.bookings.bookings);
  const perthLocation = useSelector(selectPerthLocation);
  const [stripePublicKey, set_stripePublicKey] = useState<any>(null);
  const {vechicleData} = useOzove();
  const dispatch = useDispatch();

  const {showAlert} = useAlert();
  const [loading, setLoading] = useState(true);
  const [showNextScreen, setShowNextScreen] = useState<number>(1);
  const [notes, set_notes] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('Now');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState<any>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<any>([]);
  const [activeInput, setActiveInput] = useState<null | string>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(0);
  const [sendVehicleData, setSendVehicleData] = useState<any>(vechicleData[0]);
  const [distance, setDistance] = useState<any>(null);
  const [duration, setDuration] = useState<any>(null);
  const [selecetedAdditonalServices, setSelectedAdditonalServices] = useState<
    number | null
  >(null);
  const [showCancilation, set_showCancilation] = useState(false);
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);
  const mapRef = useRef(null);
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
  const [isExpanded, setIsExpanded] = useState(false);

  const bottomSheetRef = useRef(null);

  // Import from the Ozove Context functions
  const {
    _getStripePublishableKey,
    ServerLoading,
    _getlocationSuggestions,
    _update_BookingData,
    _getInitialCoordinates,
  } = useOzove();

  const [initialLocation, set_initialLocation] = useState<any>({});

  const toggleCancilationPolicyModel = () => {
    set_showCancilation(!showCancilation);
  };

  const _get_Initial_Coordinates = async () => {
    const Location = await _getInitialCoordinates();
    if (Location !== undefined) {
      set_initialLocation(Location);
      dispatch(setPerthLocation({location: Location, setStatus: true}));
      setLoading(false);
    }
  };

  const setupKeyboardListeners = () => {
    const handleKeyboardShow = () => setIsKeyboardVisible(true);
    const handleKeyboardHide = () => setIsKeyboardVisible(false);
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  };

  useEffect(() => {
    if (Bookings?.length > 0) {
      setIsExpanded(true);
    }

    _get_Initial_Coordinates();
    const cleanupKeyboardListeners = setupKeyboardListeners();

    return () => {
      cleanupKeyboardListeners();
    };
  }, [Bookings, stripePublicKey]);

  const renderComponent = () => {
    switch (showNextScreen) {
      case 1:
        return (
          <>
            <View style={{paddingBottom: 20}}>
              <View style={{paddingHorizontal: 10}}>
                <>
                  <View style={{alignSelf: 'flex-start'}}>
                    <Text style={styles.titleText}>Ready To Book A Ride?</Text>
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
                              {pickupSuggestions.map(
                                (item: any, index: number) => (
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
                                ),
                              )}
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
                              {dropoffSuggestions.map(
                                (item: any, index: number) => (
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
                                ),
                              )}
                            </ScrollView>
                          )}
                      </View>
                    </View>
                  </View>
                </>
              </View>
              <View
                style={{
                  bottom: 0,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  paddingHorizontal: 10,
                }}>
                {
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      elevation: 5,
                    }}
                    onPress={() => {
                      if (distance > 0 && duration > 0) {
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
                      } else {
                        // For Testing only
                        setDistance(17);
                        setDuration(25);

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

                        showAlert({
                          type: 'error',
                          message: 'Please select a valid location',
                        });
                      }
                    }}
                    // disabled={
                    //   !(
                    //     pickupLocationSuggestions?.latitude &&
                    //     pickupLocationSuggestions?.longitude &&
                    //     dropoffLocationSuggestions?.latitude &&
                    //     dropoffLocationSuggestions?.longitude
                    //   )
                    // }
                  >
                    <View
                      style={{
                        backgroundColor: '#FFAF19',
                        padding: 10,
                        borderRadius: 5,
                        paddingVertical: 10,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'DMSans36pt-ExtraBold',
                          color: '#141921',
                          fontSize: 24,
                        }}>
                        {'Next'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                }
              </View>
              <View
                style={{
                  bottom: 0,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  paddingHorizontal: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    elevation: 5,
                  }}
                  onPress={() => {
                    showAlert({
                      type: 'success',
                      message: 'QR Scanner Initiated',
                      duration: 1000,
                    });
                    navigation.navigate('scanner');
                  }}>
                  <View
                    style={{
                      backgroundColor: '#141921',
                      padding: 10,
                      borderRadius: 5,
                      paddingVertical: 10,
                      width: '100%',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'DMSans36pt-ExtraBold',
                        fontSize: 24,
                        color: '#fff',
                        marginRight: 10,
                      }}>
                      {'Scan'}
                    </Text>
                    <ScanIcon />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.carouselContainer}>
                <BookingCarousel />
              </View>
            </View>
          </>
        );
      case 2:
        return (
          <>
            <View style={{paddingBottom: 150}}>
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
                notes={notes}
                set_notes={set_notes}
                sendVehicleData={sendVehicleData}
                setSendVehicleData={setSendVehicleData}
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
                      width: '94%',
                      elevation: 5,
                    }}
                    onPress={() => {
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
                        borderRadius: 5,
                        paddingVertical: 12,
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
            </View>
          </>
        );
      case 3:
        return (
          <>
            <View style={{paddingBottom: 150}}>
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
                sendVehicleData={sendVehicleData}
                setSendVehicleData={setSendVehicleData}
              />
            </View>
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

  const snapPoints = useMemo(() => {
    if (Bookings?.length > 0) {
      return ['88%']; // Always use 80% when there are bookings
    }

    if (showNextScreen !== 1) {
      return showNextScreen === 3 ? ['60%', '90%'] : ['60%', '80%'];
    } else {
      return ['60%', '80%'];
    }
  }, [showNextScreen, Bookings?.length]);

  // useEffect(() => {
  //   if (bottomSheetRef.current) {
  //     const targetIndex = isExpanded ? snapPoints.length - 1 : 0;
  //     bottomSheetRef.current?.snapToIndex(targetIndex);
  //   }
  // }, [isExpanded, snapPoints]);

  console.log('Redux perth location : ', perthLocation);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View style={{flex: 1}}>
          <View style={styles.container}>
            {loading || !perthLocation ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LoaderZiffy />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                }}>
                <Pressable style={StyleSheet.absoluteFill}>
                  <MapView
                    ref={mapRef}
                    style={[
                      styles.map,
                      {
                        height: Bookings?.length > 0 ? '60%' : '70%',
                      },
                    ]}
                    showsUserLocation={true}
                    initialRegion={
                      perthLocation?.setStatus
                        ? perthLocation?.location
                        : initialLocation
                    }
                    region={
                      perthLocation?.setStatus
                        ? perthLocation?.location
                        : initialLocation
                    }>
                    <Marker
                      coordinate={{
                        latitude: -31.9523,
                        longitude: 115.8613,
                      }}
                      title="PERMANENT TEST MARKER"
                      pinColor="black"
                      tracksViewChanges={true}
                    />
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

                <Header navigation={navigation} />
                {showDatePicker && (
                  <View>
                    <DateTimePickerModal
                      isVisible={showDatePicker}
                      mode="date"
                      onConfirm={selectedDate => {
                        setShowDatePicker(false);
                        setDate(selectedDate);
                      }}
                      onCancel={() => setShowDatePicker(false)}
                      pickerContainerStyleIOS={{
                        backgroundColor: 'white',
                        paddingBottom: 10,
                        borderRadius: 5,
                      }}
                      customHeaderIOS={() => (
                        <View
                          style={{
                            padding: 16,
                            alignItems: 'flex-start',
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: 'DMSans36pt-SemiBold',
                              color: '#141921',
                            }}>
                            Schedule Ride
                          </Text>
                        </View>
                      )}
                      customConfirmButtonIOS={({onPress}) => (
                        <TouchableOpacity
                          onPress={onPress}
                          style={{
                            backgroundColor: '#FFAF19',
                            padding: 14,
                            borderRadius: 5,
                            alignItems: 'center',
                            marginHorizontal: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: 'DMSans36pt-SemiBold',
                              color: '#141921',
                            }}>
                            Schedule
                          </Text>
                        </TouchableOpacity>
                      )}
                      customCancelButtonIOS={({onPress}) => (
                        <TouchableOpacity
                          onPress={onPress}
                          style={{
                            backgroundColor: '#141921',
                            padding: 14,
                            borderRadius: 5,
                            alignItems: 'center',
                            marginHorizontal: 10,
                            marginBottom: 20,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: 'DMSans36pt-SemiBold',
                              color: '#fff',
                            }}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                )}
                <BottomSheet
                  ref={bottomSheetRef}
                  snapPoints={snapPoints}
                  index={0} // Initial index
                  enablePanDownToClose={false}
                  enableContentPanningGesture={true}
                  enableOverDrag={false}
                  style={{marginTop: 150}}>
                  <BottomSheetView style={styles.sheetContainer}>
                    <BottomSheetScrollView
                      contentContainerStyle={styles.sheetContent}>
                      {renderComponent()}
                    </BottomSheetScrollView>
                  </BottomSheetView>
                </BottomSheet>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
