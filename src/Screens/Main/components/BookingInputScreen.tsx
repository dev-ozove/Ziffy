import {View, Text, TouchableOpacity, Image, Modal, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Styles, styles} from '../../../Components/MainStyles';
import {
  BookingInputScreenProps,
  ServiceState,
} from '../../../Context/Types/ozove';
import DateTimePicker from '@react-native-community/datetimepicker';
import {times} from '../../../Components/helpers';
import Entypo from 'react-native-vector-icons/Entypo';
import PickupLocationIcon from '../../../../assests/Pickup_icon.svg';

import BackIcon from '../../../../assests/back_icon.svg';
import Callender from '../../../../assests/Callender.svg';
import Clock from '../../../../assests/Clock.svg';
import Per_person_price from '../../../../assests/per_person_price_icon.svg';
import Account_icon from '../../../../assests/sidebar/bookings/Avatar_icon.svg';

import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';

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
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  console.log('>>', servicesState);

  // Update the initial state for vehiclePricing

  const [loading, setLoading] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Helper function to get initial state based on service type
  const getInitialServiceState = (serviceTitle: string) => {
    const service = Additional_services.find(s => s.title === serviceTitle);
    if (!service) return {};

    switch (service.type) {
      case 'hourly':
        return {hours: 3};
      case 'split':
        return {split: false};
      case 'vehicle':
        return {vehicleCount: 1};
      default:
        return {};
    }
  };

  const handleServicePress = (serviceTitle: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceTitle)
        ? prev.filter(title => title !== serviceTitle)
        : [...prev, serviceTitle],
    );

    // Initialize service state if it doesn't exist
    if (!servicesState[serviceTitle]) {
      setServicesState((prev: any) => ({
        ...prev,
        [serviceTitle]: getInitialServiceState(serviceTitle),
      }));
    }
  };

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

  const renderServiceContent = (service: any, serviceState: ServiceState) => {
    //const serviceState = servicesState[service.id] || {};
    console.log('>>', servicesState);
    switch (service.type) {
      case 'hourly':
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#666', marginRight: 16}}>Book for:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  const newHours = Math.max(3, (serviceState.hours || 3) - 1);
                  setServicesState((prev: any) => ({
                    ...prev,
                    [service.title]: {...serviceState, hours: newHours},
                  }));
                }}
                style={Styles.hourButton}>
                <Text style={{fontSize: 18}}>-</Text>
              </TouchableOpacity>
              <Text style={{paddingHorizontal: 16, fontSize: 16}}>
                {serviceState.hours || 3}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const newHours = (serviceState.hours || 3) + 1;
                  setServicesState((prev: any) => ({
                    ...prev,
                    [service.title]: {...serviceState, hours: newHours},
                  }));
                }}
                style={Styles.hourButton}>
                <Text style={{fontSize: 18}}>+</Text>
              </TouchableOpacity>
              <Text style={{marginLeft: 16, color: '#666'}}>Hours</Text>
            </View>
          </View>
        );

      case 'split':
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#666'}}>Enable split payment</Text>
            <Switch
              value={serviceState.split || false}
              onValueChange={value => {
                setServicesState((prev: any) => ({
                  ...prev,
                  [service.title]: {...serviceState, split: value},
                }));
              }}
              trackColor={{false: '#767577', true: '#FFAF19'}}
              thumbColor="#fff"
            />
          </View>
        );

      case 'vehicle':
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#666', marginRight: 16}}>Vehicles:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  const newCount = Math.max(
                    1,
                    (serviceState.vehicleCount || 1) - 1,
                  );
                  setServicesState((prev: any) => ({
                    ...prev,
                    [service.title]: {...serviceState, vehicleCount: newCount},
                  }));
                }}
                style={Styles.hourButton}>
                <Text style={{fontSize: 18}}>-</Text>
              </TouchableOpacity>
              <Text style={{paddingHorizontal: 16, fontSize: 16}}>
                {serviceState.vehicleCount || 1}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const newCount = Math.min(
                    3,
                    (serviceState.vehicleCount || 1) + 1,
                  );
                  setServicesState((prev: any) => ({
                    ...prev,
                    [service.title]: {...serviceState, vehicleCount: newCount},
                  }));
                }}
                style={Styles.hourButton}>
                <Text style={{fontSize: 18}}>+</Text>
              </TouchableOpacity>
              <Text style={{marginLeft: 16, color: '#666'}}>
                Max 3 vehicles
              </Text>
            </View>
          </View>
        );

      default:
        return (
          <Text style={{color: '#666', paddingVertical: 8}}>
            {service.subtitle || 'Service details'}
          </Text>
        );
    }
  };

  const handleVechileChange = (index: number) => {
    setSelectedVehicle(index);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <TouchableOpacity
          style={{marginTop: 50, marginBottom: 20}}
          onPress={() => {
            setShowNextScreen(showNextScreen - 1);
          }}>
          <View>
            <BackIcon />
          </View>
        </TouchableOpacity>
        <View>
          <View style={{width: '100%'}}>
            <View style={{marginLeft: 6, marginBottom: 24, gap: 16}}>
              {/* Pickup Location */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor: '#F0F0F0',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#ccc',
                }}>
                <PickupLocationIcon />
                <Text
                  style={{color: '#141921', fontWeight: 'bold', width: '95%'}}>
                  {pickupLocation}
                </Text>
              </View>

              {/* Dropoff Location */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor: '#F0F0F0',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#ccc',
                }}>
                <PickupLocationIcon />
                <Text
                  style={{color: '#141921', fontWeight: 'bold', width: '95%'}}>
                  {dropoffLocation}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                fontSize: 20,
                color: '#4A4A4A',
                fontWeight: 'bold',
              }}>
              Select Date and Time
            </Text>
          </View>
          <View
            style={{
              flex: 1,
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
                  borderColor: '#CFD3CF',
                  backgroundColor: '#FCFCFC',
                  gap: 5,
                  borderRadius: 15,
                }}
                onPress={() => setShowDatePicker(true)}>
                <Text style={styles.icon}>
                  <Callender />
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  {date.toDateString()}
                </Text>
                <Text style={styles.arrow}>▼</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  collapsable
                  mode="date"
                  display="calendar"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setDate(selectedDate);
                  }}
                />
              )}
              {/*Time Picker*/}
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  height: 50,
                  borderWidth: 2,
                  borderColor: '#CFD3CF',
                  backgroundColor: '#FCFCFC',
                  borderRadius: 15,
                  justifyContent: 'space-between',
                  marginLeft: 5,
                  flex: 1,
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
                  {selectedTime || 'Select Time'}
                </Text>
                <Clock style={{marginRight: 10}} />
              </TouchableOpacity>

              <Modal
                visible={showTimePicker}
                transparent={true}
                animationType="fade">
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      maxHeight: '50%',
                      margin: 20,
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
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 20,
            color: '#4A4A4A',
            fontWeight: 'bold',
          }}>
          Select Vehicle Type
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
          }}>
          {Vechicle_data?.map((item, index) => {
            const isSelected = selectedVehicle === index;
            return (
              <TouchableOpacity
                key={index}
                style={{}}
                onPress={() => handleVechileChange(index)}>
                <View
                  key={index}
                  style={{
                    width: 110,
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                    marginHorizontal: 5,
                    backgroundColor: isSelected ? '#fff' : '#F0EFEf',
                    borderWidth: 2,
                    borderColor: isSelected ? '#FFAF19' : 'transparent',
                  }}>
                  <View
                    style={{
                      height: 90,
                      width: 90,
                    }}>
                    <Image
                      style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'contain',
                        borderRadius: 12,
                      }}
                      source={item?.image}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                    }}>
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          color: '#4A4A4A',
                          fontSize: 16,
                          fontWeight: 600,
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
                          color: '#333',
                          fontSize: 14,
                          fontWeight: 'bold',
                        }}>
                        {/* Pricing  */}
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
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedVehicle !== null && (
          <View
            style={{
              marginVertical: 20,
              height: 'auto',
              borderRadius: 12,
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
                    fontWeight: 'bold',
                  }}>
                  {Vechicle_data[selectedVehicle]?.details.Full_name}
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
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {`$${(
                          (vehiclePricing[
                            selectedVehicle === 0
                              ? 'van'
                              : selectedVehicle === 1
                              ? 'miniBus'
                              : 'bus'
                          ]?.minimumFare || 0) /
                          Vechicle_data[selectedVehicle]?.capacity
                        ).toFixed(2)}`}
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
                          ((vehiclePricing[
                            selectedVehicle === 0
                              ? 'van'
                              : selectedVehicle === 1
                              ? 'miniBus'
                              : 'bus'
                          ]?.minimumFare || 0) /
                            Vechicle_data[selectedVehicle]?.capacity) *
                          1.5
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
                          {Vechicle_data[selectedVehicle]?.capacity} Seater
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
                      <View style={{flexDirection: 'row'}}>
                        <Text>{duration?.toFixed(1)} min away</Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={{flexDirection: 'row', marginTop: 4, gap: 4}}>
                      <Text style={{color: '#707070'}}>Minimum</Text>
                      <Text style={{color: '#707070'}}>
                        {
                          Vechicle_data[selectedVehicle]?.details
                            ?.minimum_capacity
                        }
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
                  source={Vechicle_data[selectedVehicle]?.details?.image}
                />
              </View>
            </View>
          </View>
        )}
        {selectedVehicle !== null && (
          <View style={{marginVertical: 10, gap: 10, height: 'auto'}}>
            <View>
              <Text
                style={{fontWeight: 'bold', color: '#333333', fontSize: 24}}>
                Additional Service
              </Text>
            </View>
            {selectedVehicle !== null && (
              <View style={{marginVertical: 10, gap: 10, height: 'auto'}}>
                {Additional_services.map(item => {
                  const isSelected = selectedServices.includes(item.title);
                  const serviceState = servicesState[item.title] || {};
                  return (
                    <View key={item.id}>
                      <TouchableOpacity
                        onPress={() => handleServicePress(item.title)}
                        style={[
                          Styles.serviceButton,
                          isSelected && Styles.selectedServiceButton,
                        ]}>
                        <View style={Styles.serviceContent}>
                          <View>
                            <Text
                              style={[
                                Styles.serviceTitle,
                                isSelected && Styles.selectedText,
                              ]}>
                              {item.title}
                            </Text>
                            {item.subtitle && (
                              <Text
                                style={[
                                  Styles.serviceSubtitle,
                                  isSelected && Styles.selectedText,
                                ]}>
                                {item.subtitle}
                              </Text>
                            )}
                          </View>
                          <Text
                            style={[
                              Styles.servicePrice,
                              isSelected && Styles.selectedText,
                            ]}>
                            {item.price > 0 ? `$${item.price}` : 'Free'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      {isSelected && (
                        <View style={Styles.serviceDetailsContainer}>
                          {renderServiceContent(item, serviceState)}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default BookingInputScreen;
