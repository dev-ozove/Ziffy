import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Switch,
  Platform,
  TouchableWithoutFeedback,
  Alert,
  Animated,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Styles, styles} from '../../../Components/MainStyles';
import {
  BookingInputScreenProps,
  ServiceState,
} from '../../../Context/Types/ozove';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {times} from '../../../Components/helpers';
import PickupLocationIcon from '../../../../assets/Pickup_icon.svg';

import BackIcon from '../../../../assets/back_icon.svg';
import Callender from '../../../../assets/Callender.svg';
import Clock from '../../../../assets/Clock.svg';
import Per_person_price from '../../../../assets/per_person_price_icon.svg';
import Account_icon from '../../../../assets/sidebar/bookings/Avatar_icon.svg';

import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import {useOzove} from '../../../Context/ozoveContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownIcon from '../../../../assets/drop_down_icon.svg';

const BookingInputScreen: React.FC<BookingInputScreenProps> = ({
  selectedVehicle,
  Vechicle_data,
  setShowDatePicker,
  date,
  showDatePicker,
  setDate,
  selectedTime,
  setSelectedTime,
  setSelectedVehicle,
  Additional_services,
  selecetedAdditonalServices,
  setSelectedAdditonalServices,
  setShowNextScreen,
  showNextScreen,
  pickupLocation,
  dropoffLocation,

  setServicesState,
  servicesState,
  vehiclePricing,
  setVehiclePricing,
  distance,
  duration,
  notes,
  set_notes,
  sendVehicleData,
  setSendVehicleData,
}) => {
  // Update the initial state for vehiclePricing
  const [loading, setLoading] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const {vechicleData} = useOzove();
  const [selectedVechicle, setSelectedVechicle] = useState<any>(
    vechicleData[0],
  );
  console.log(vechicleData, 'vechicleData');

  // Fetch pricing data from Firestore
  const readVehiclePricing = async () => {
    try {
      const docRef = firestore()
        .collection('PRICE_CALCULATOR')
        .doc('VehicleRates');
      const documentSnapshot = await docRef.get();
      if (documentSnapshot.exists) {
        const pricingData = documentSnapshot.data();
        setVehiclePricing({
          van: pricingData?.van || {minimumFare: 0},
          miniBus: pricingData?.miniBus || {minimumFare: 0},
          bus: pricingData?.bus || {minimumFare: 0},
        });
        // Set Van as the default selected vehicle (index 0)
        setSelectedVehicle(0);
      }
    } catch (error) {
      console.error('Error fetching pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    readVehiclePricing();
  }, []);

  const handleVechileChange = (index: number, selectedItem: any) => {
    setSelectedVehicle(index);
    setSelectedVechicle(selectedItem);
    setSendVehicleData(selectedItem);
  };

  const formattedDate = date
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    .replace(/ /g, '-');

  return (
    <View style={{paddingHorizontal: 10}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => {
              setShowNextScreen(showNextScreen - 1);
            }}>
            <View>
              <BackIcon />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.titleText}>Ready To Book A Ride?</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View style={{width: '100%'}}>
          <View>
            <View style={{marginBottom: 15, gap: 10}}>
              {/* Pickup Location */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 5,
                  paddingVertical: 14,
                  backgroundColor: '#F0F0F0',
                  borderRadius: 5,
                  borderColor: '#ccc',
                }}>
                <PickupLocationIcon />
                <Text
                  style={{
                    color: '#141921',
                    fontWeight: 'bold',
                    fontSize: 14,
                    width: '80%',
                    marginHorizontal: 5,
                    marginRight: 5,
                  }}>
                  {pickupLocation}
                </Text>
              </View>

              {/* Dropoff Location */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 5,
                  paddingVertical: 14,
                  backgroundColor: '#F0F0F0',
                  borderRadius: 5,
                  borderColor: '#ccc',
                }}>
                <PickupLocationIcon />
                <Text
                  style={{
                    color: '#141921',
                    fontWeight: 'bold',
                    fontSize: 14,
                    width: '80%',
                    marginHorizontal: 5,
                    marginRight: 10,
                  }}>
                  {dropoffLocation}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                fontFamily: 'DMSans36pt-ExtraBold',
                color: '#141921',
                fontSize: 22,
              }}>
              Select Date and Time
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {/* Date Picker */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  height: 50,
                  borderWidth: 2,
                  borderColor: '#FFAF19',
                  backgroundColor: '#FFEFC5',
                  gap: 5,
                  borderRadius: 5,
                }}
                onPress={() => setShowDatePicker(true)}>
                <Text style={styles.icon}>
                  <Callender />
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'DMSans24pt-Bold',
                    color: '#000',
                  }}>
                  {formattedDate}
                </Text>
                <DropDownIcon />
              </TouchableOpacity>

              {/*Time Picker*/}
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  height: 50,
                  borderWidth: 2,
                  borderColor: '#FFAF19',
                  backgroundColor: '#FFEFC5',
                  borderRadius: 5,
                  justifyContent: 'space-between',
                  marginLeft: 5,
                  flex: 1,
                }}>
                <Clock style={{}} />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'DMSans24pt-Bold',
                    color: '#000',
                  }}>
                  {selectedTime || 'Select Time'}
                </Text>
                <DropDownIcon />
              </TouchableOpacity>

              <Modal
                visible={showTimePicker}
                transparent={true}
                animationType="fade">
                <TouchableWithoutFeedback
                  onPress={() => setShowTimePicker(false)}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center', // Center the modal content
                      backgroundColor: 'rgba(0,0,0,0.5)',
                    }}>
                    <TouchableWithoutFeedback>
                      <View
                        style={{
                          backgroundColor: 'white',
                          maxHeight: '50%',
                          width: '90%', // Adjust width for better UI
                          borderRadius: 16,
                          padding: 16,
                        }}>
                        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                          {times.map((time, index) => (
                            <TouchableOpacity
                              key={index}
                              style={[
                                {
                                  padding: 16,
                                  borderBottomWidth: 1,
                                  borderBottomColor: '#eee',
                                },
                                selectedTime === time && {
                                  backgroundColor: '#FFAF19',
                                  borderRadius: 8,
                                },
                              ]}
                              onPress={() => {
                                setSelectedTime(time);
                                setShowTimePicker(false);
                              }}>
                              <Text
                                style={[
                                  {fontSize: 16, color: '#333'},
                                  selectedTime === time && {
                                    color: 'white',
                                    fontWeight: 'bold',
                                  },
                                ]}>
                                {time}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontFamily: 'DMSans36pt-ExtraBold',
            color: '#141921',
            fontSize: 22,
          }}>
          Select Vehicle Type
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
            marginTop: 10,
          }}>
          {vechicleData?.map((item: any, index: number) => {
            const isSelected = selectedVehicle === index;
            console.log('Selected Vehicle', item);
            return (
              <TouchableOpacity
                key={index}
                style={{flex: 1}}
                onPress={() => handleVechileChange(index, item)}>
                <View
                  key={index}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: 130,
                    padding: 2,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    backgroundColor: isSelected ? '#fff' : '#F0EFEf',
                    borderWidth: 2,
                    borderColor: isSelected ? '#FFAF19' : 'transparent',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                    }}>
                    <Image
                      style={{
                        height: '90%',
                        width: '90%',
                        resizeMode: 'contain',
                      }}
                      source={{uri: item?.image}}
                    />
                  </View>
                  <View style={{flex: 1, width: '100%'}}>
                    <View
                      style={{
                        flex: 1,
                        width: '100%',
                      }}>
                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'DMSans36pt-SemiBold',
                            color: '#141921',
                          }}>
                          {item?.title}
                        </Text>
                      </View>
                      <View style={{marginLeft: 10}}>
                        <Text style={{color: '#767676', fontSize: 12}}>
                          {`${item?.capacity} seater`}
                        </Text>
                      </View>
                      <View style={{marginLeft: 10, paddingBottom: 20}}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'DMSans36pt-SemiBold',
                            color: '#141921',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: 'green',
                                fontWeight: 'bold',
                                fontSize: 16,
                              }}>
                              From
                            </Text>
                            <Text
                              style={{
                                color: '#333',
                                fontSize: 16,
                                paddingHorizontal: 5,
                              }}>
                              $
                              {index === 0
                                ? vehiclePricing?.van?.minimumFare
                                : index === 1
                                ? vehiclePricing?.miniBus?.minimumFare
                                : vehiclePricing?.bus?.minimumFare}
                            </Text>
                          </View>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedVehicle !== null && (
          <View
            style={{
              marginVertical: 10,
              height: 'auto',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#FFAF19',
              elevation: 5,
              backgroundColor: '#FFEFC5',
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 2}}>
                <Text
                  style={{
                    color: '#333',
                    padding: 10,
                    fontSize: 18,
                    fontFamily: 'DMSans36pt-ExtraBold',
                  }}>
                  {selectedVechicle?.details?.Full_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <View>
                    <Per_person_price width={40} height={40} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column', // Change to column layout
                      justifyContent: 'center',
                      alignItems: 'flex-start', // Align text to the left
                      marginLeft: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#333',
                          fontFamily: 'DMSans36pt-ExtraBold',
                          fontSize: 18,
                        }}>
                        {`$${selectedVechicle?.details?.per_person_price}`}
                      </Text>
                      <View>
                        <Text
                          style={{
                            color: '#000',
                            marginLeft: 8,
                            fontWeight: 'bold',
                          }}>
                          /person
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#999',
                          fontSize: 14,
                          textDecorationLine: 'line-through',
                        }}>
                        {`$${(
                          selectedVechicle?.details?.per_person_price * 1.5
                        ).toFixed(2)}`}
                      </Text>
                    </View>
                    {/* Add the stroked price */}
                  </View>
                </View>
                <View style={{padding: 10}}>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                      <View>
                        <Account_icon />
                      </View>
                      <View>
                        <Text style={{color: '#000'}}>
                          {selectedVechicle?.details?.maximum_capacity} Seater
                        </Text>
                      </View>
                    </View>
                    <View style={{width: 1, backgroundColor: '#333'}} />
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold'}}>
                          Total Distance :
                        </Text>
                        <Text style={{marginLeft: 4}}>
                          {distance?.toFixed(1)} km
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={{flexDirection: 'row', marginTop: 4, gap: 4}}>
                      <Text style={{color: '#707070'}}>Minimum</Text>
                      <Text style={{color: '#707070'}}>
                        {selectedVechicle?.details?.minimum_capacity}
                      </Text>
                      <Text style={{color: '#707070'}}>passengers</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    marginLeft: -80,
                    height: 150,
                    width: 150,
                    resizeMode: 'contain',
                  }}
                  source={{uri: selectedVechicle?.details?.image}}
                />
              </View>
            </View>
          </View>
        )}
        <View style={styles.notesContainer}>
          <TextInput
            style={styles.notesInput}
            placeholder="Notes For Driver"
            placeholderTextColor="#000"
            multiline={true}
            value={notes}
            onChangeText={set_notes}
          />
        </View>
      </View>
    </View>
  );
};

export default BookingInputScreen;
