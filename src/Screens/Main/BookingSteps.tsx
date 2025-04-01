import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useOzove} from '../../Context/ozoveContext';
import {useAlert} from '../../Context/AlertContext';
import {Additional_services, Vechicle_data} from '../../Config/constants';
import BookingInputScreen from './components/BookingInputScreen';
import FinalBookingScreen from './components/FinalBookingScreen';
import BookingCarousel from './components/BookingCarousel';
import ScanIcon from '../../../assets/Scanner/ScanIcon.svg';
import PickupLocationIcon from '../../../assets/Pickup_icon.svg';
import {styles} from '../../Components/MainStyles';
import {Timestamp} from '@react-native-firebase/firestore';
import {ServiceState} from '../../Context/Types/ozove';

interface BookingStepsProps {
  showNextScreen: number;
  setShowNextScreen: (value: number) => void;
  pickupLocation: string;
  setPickupLocation: (value: string) => void;
  dropoffLocation: string;
  setDropoffLocation: (value: string) => void;
  pickupSuggestions: any[];
  setPickupSuggestions: (value: any[]) => void;
  dropoffSuggestions: any[];
  setDropoffSuggestions: (value: any[]) => void;
  activeInput: string | null;
  setActiveInput: (value: string | null) => void;
  selectedVehicle: number | null;
  setSelectedVehicle: (value: number | null) => void;
  sendVehicleData: any;
  setSendVehicleData: (value: any) => void;
  distance: number | null;
  setDistance: (value: number | null) => void;
  duration: number | null;
  setDuration: (value: number | null) => void;
  selecetedAdditonalServices: number | null;
  setSelectedAdditonalServices: (value: number | null) => void;
  date: Date;
  setDate: (value: Date) => void;
  selectedTime: string;
  setSelectedTime: (value: string) => void;
  showDatePicker: boolean;
  setShowDatePicker: (value: boolean) => void;
  servicesState: {[key: number]: ServiceState};
  setServicesState: (value: {[key: number]: ServiceState}) => void;
  vehiclePricing: {van?: any; miniBus?: any; bus?: any};
  setVehiclePricing: (value: {van?: any; miniBus?: any; bus?: any}) => void;
  notes: string;
  set_notes: (value: string) => void;
  passengerCount: number;
  setPassengerCount: (value: number) => void;
  showCancilation: boolean;
  set_showCancilation: (value: boolean) => void;
  pickupLocationSuggestions: any;
  setPickupLocationSuggestions: (value: any) => void;
  dropoffLocationSuggestions: any;
  setDropoffLocationSuggestions: (value: any) => void;
  ServerLoading: boolean;
}

const BookingSteps: React.FC<BookingStepsProps> = ({
  showNextScreen,
  setShowNextScreen,
  pickupLocation,
  setPickupLocation,
  dropoffLocation,
  setDropoffLocation,
  pickupSuggestions,
  setPickupSuggestions,
  dropoffSuggestions,
  setDropoffSuggestions,
  activeInput,
  setActiveInput,
  selectedVehicle,
  setSelectedVehicle,
  sendVehicleData,
  setSendVehicleData,
  distance,
  setDistance,
  duration,
  setDuration,
  selecetedAdditonalServices,
  setSelectedAdditonalServices,
  date,
  setDate,
  selectedTime,
  setSelectedTime,
  showDatePicker,
  setShowDatePicker,
  servicesState,
  setServicesState,
  vehiclePricing,
  setVehiclePricing,
  notes,
  set_notes,
  passengerCount,
  setPassengerCount,
  showCancilation,
  set_showCancilation,
  pickupLocationSuggestions,
  setPickupLocationSuggestions,
  dropoffLocationSuggestions,
  setDropoffLocationSuggestions,
  ServerLoading,
}) => {
  const navigation = useNavigation<any>();
  const {_update_BookingData, _getlocationSuggestions} = useOzove();
  const {showAlert} = useAlert();

  const handleLocationSelect = (location: any, isPickup: boolean) => {
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Handles location selection in either pickup or dropoff text inputs.
     * Sets state for location suggestions and clears suggestion lists.
     * @param {object} location - selected location object
     * @param {boolean} isPickup - true if location is for pickup, false if for dropoff
     */
    /******  130af3db-b6e3-4e04-8a7e-3f8c312f17e2  *******/ if (isPickup) {
      setPickupLocation(location.formatted);
      const data = {
        latitude: location?.lat,
        longitude: location?.lon,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setPickupLocationSuggestions(data);
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
      setDropoffSuggestions([]);
    }
  };

  const handleSuggestions = async (query: string, isPickup: boolean) => {
    const suggestions = await _getlocationSuggestions(query);
    if (isPickup) {
      setPickupSuggestions(suggestions);
    } else {
      setDropoffSuggestions(suggestions);
    }
  };

  const toggleCancilationPolicyModel = () => {
    set_showCancilation(!showCancilation);
  };

  switch (showNextScreen) {
    case 1:
      return (
        <View style={{paddingBottom: 20}}>
          <View style={{paddingHorizontal: 10}}>
            <View style={{alignSelf: 'flex-start'}}>
              <Text style={styles.titleText}>Ready To Book A Ride?</Text>
            </View>

            <View style={styles.inputRow}>
              <View style={componentStyles.inputContainer}>
                <View style={styles.iconContainer}>
                  <PickupLocationIcon />
                </View>
                <View style={{flex: 1, gap: 10}}>
                  <TextInput
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
                        keyboardShouldPersistTaps="handled">
                        {pickupSuggestions.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.suggestionItem}
                            onPress={() => handleLocationSelect(item, true)}>
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

            <View style={styles.inputRow}>
              <View style={componentStyles.inputContainer}>
                <View style={styles.iconContainer}>
                  <PickupLocationIcon />
                </View>
                <View style={{flex: 1, gap: 10}}>
                  <TextInput
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
                        keyboardShouldPersistTaps="handled">
                        {dropoffSuggestions.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.suggestionItem}
                            onPress={() => handleLocationSelect(item, false)}>
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
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={componentStyles.primaryButton}
              onPress={() => {
                if (distance && duration && distance > 0 && duration > 0) {
                  const formdata = [
                    {
                      key: 'From',
                      value: pickupLocation,
                    },
                    {
                      key: 'To',
                      value: dropoffLocation,
                    },
                    // ... other form data
                  ];
                  _update_BookingData(formdata);
                  setShowNextScreen(showNextScreen + 1);
                } else {
                  showAlert({
                    type: 'error',
                    message: 'Please select valid locations',
                  });
                }
              }}
              disabled={
                !(
                  pickupLocationSuggestions?.latitude &&
                  pickupLocationSuggestions?.longitude &&
                  dropoffLocationSuggestions?.latitude &&
                  dropoffLocationSuggestions?.longitude
                )
              }>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                showAlert({
                  type: 'success',
                  message: 'QR Scanner Initiated',
                  duration: 1000,
                });
                navigation.navigate('scanner');
              }}>
              <Text style={componentStyles.scanButtonText}>Scan</Text>
              <ScanIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.carouselContainer}>
            <BookingCarousel />
          </View>
        </View>
      );

    case 2:
      return (
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

          {selectedVehicle !== null && selectedTime && date && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={componentStyles.primaryButton}
                onPress={() => {
                  const formdata = [
                    {
                      key: 'selectedVehicle',
                      value: selectedVehicle,
                    },
                    // ... other form data
                  ];
                  _update_BookingData(formdata);
                  setShowNextScreen(showNextScreen + 1);
                }}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      );

    case 3:
      return (
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
            distance={distance}
            duration={duration}
            setPassenger_Count={setPassengerCount}
            passenger_Count={passengerCount}
            additionalFeatures={servicesState}
            sendVehicleData={sendVehicleData}
            setSendVehicleData={setSendVehicleData}
            setVehiclePricing={setVehiclePricing}
          />
        </View>
      );

    default:
      return null;
  }
};

const componentStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  primaryButton: {
    backgroundColor: '#FFAF19',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#141921',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'DMSans36pt-ExtraBold',
    color: '#141921',
    fontSize: 24,
  },
  scanButtonText: {
    fontFamily: 'DMSans36pt-ExtraBold',
    fontSize: 24,
    color: '#fff',
    marginRight: 10,
  },
});

export default BookingSteps;
