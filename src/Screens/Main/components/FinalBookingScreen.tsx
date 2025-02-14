import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  TextInput,
  Modal,
  Button,
  TouchableHighlight,
  Linking,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackIcon from '../../../../assests/back_icon.svg';
import Phone_Icon from '../../../../assests/sidebar/Contacts.svg';
import {styles} from '../../../Components/MainStyles';
import PickupLocationIcon from '../../../../assests/Pickup_icon.svg';

import {getAuth} from '@react-native-firebase/auth';
import {Booking, VehicleData} from '../../../Context/Types/ozove';
import {useOzove} from '../../../Context/ozoveContext';
import {useAppSelector} from '../../../hooks/useRedux';
import {useNavigation} from '@react-navigation/native';

// Define the interfaces for the props

interface AdditionalFeatures {
  'Add More Vehicles'?: {vehicleCount: number};
  'Hourly Bookings'?: {hours: number};
  'Luggage Trailer'?: Record<string, never>;
  'Split Payment'?: {split: boolean};
}

interface ReviewBookingProps {
  showNextScreen: number;
  setShowNextScreen: (value: number) => void;
  set_showCancilation: (value: boolean) => void;
  selectedVehicle: number | null;
  Vechicle_data: VehicleData[];
  ServerLoading: boolean;
  toggleCancilationPolicyModel: () => void;
  showCancilation: boolean;
  vehiclePricing: any;
  setVehiclePricing: (value: any) => void;
  distance: any;
  duration: any;
  setPassenger_Count: (value: number) => void;
  passenger_Count: number;
  additionalFeatures: AdditionalFeatures;
}

const FinalBookingScreen: React.FC<ReviewBookingProps> = ({
  showNextScreen,
  setShowNextScreen,
  set_showCancilation,
  selectedVehicle,
  Vechicle_data,
  ServerLoading,
  toggleCancilationPolicyModel,
  showCancilation,
  vehiclePricing,
  setVehiclePricing,
  distance,
  duration,
  setPassenger_Count,
  passenger_Count,
  additionalFeatures,
}) => {
  const {bookingData} = useOzove();
  const [localLoading, set_localLoading] = useState(false);
  const {_handleBooking, _update_BookingData} = useOzove();
  const auth = getAuth();
  const navigation = useNavigation<any>();
  console.log(vehiclePricing);

  const Generate_OrderID = () => {
    const randomPart = Math.floor(100000 + Math.random() * 900000); // Generate 6 random digits
    const timestampPart = Date.now().toString().slice(-2); // Use the last 2 digits of the timestamp

    return `${randomPart}${timestampPart}`; // Combine to form an 8-digit number
  };

  // Calculate additional features costs
  const additionalCosts = {
    extraVehicles: {
      count: additionalFeatures['Add More Vehicles']?.vehicleCount || 0,
      cost: (additionalFeatures['Add More Vehicles']?.vehicleCount || 0) * 30,
    },
    hourlyBooking: {
      hours: additionalFeatures['Hourly Bookings']?.hours || 0,
      cost: (additionalFeatures['Hourly Bookings']?.hours || 0) * 50,
    },
    splitPayment: {
      enabled: additionalFeatures['Split Payment']?.split || false,
      cost: additionalFeatures['Split Payment']?.split ? 30 : 0,
    },
  };

  const {
    Selected_vechile_pricing,
    distanceCharge,
    Total_Price,
    PayableAmount,
    grandTotal,
    passengerNum,
  } = useMemo(() => {
    const Selected_vechile_pricing =
      selectedVehicle === 0
        ? vehiclePricing?.van
        : selectedVehicle === 1
        ? vehiclePricing?.miniBus
        : vehiclePricing?.bus;

    const minimumFare = parseFloat(Selected_vechile_pricing?.minimumFare) || 0;
    const perKmFare = parseFloat(Selected_vechile_pricing?.perKmFare) || 0;
    const distanceNum = parseFloat(distance) || 0;
    const passengerNum = passenger_Count || 1;

    const distanceCharge = +(distanceNum * perKmFare).toFixed(2) || 0;
    const Total_Price = +(minimumFare + distanceCharge).toFixed(2) || 0;

    // if (Total_Price > 0) {
    //   const formdata = [
    //     {
    //       key: 'TotalPrice',
    //       value: Total_Price || 0,
    //     },
    //   ];
    //   _update_BookingData(formdata);
    // }

    const PayableAmount = +(Total_Price * passengerNum).toFixed(2) || 0;

    const totalAdditionalCosts = Object.values(additionalCosts).reduce(
      (sum, item) => sum + (item.cost || 0),
      0,
    );

    const baseAmount = Total_Price * passengerNum;
    const grandTotal = +(baseAmount + totalAdditionalCosts).toFixed(2);

    return {
      Selected_vechile_pricing,
      distanceCharge,
      Total_Price,
      PayableAmount: baseAmount,
      additionalCosts,
      grandTotal,
      passengerNum,
    };
  }, [
    selectedVehicle,
    vehiclePricing,
    distance,
    passenger_Count,
    additionalFeatures,
  ]);

  const _LocalhandleBooking = async () => {
    set_localLoading(true);

    const OrderID = Generate_OrderID();
    if (OrderID) {
      await _handleBooking(OrderID, 'Pending')
        .then(() => {
          set_localLoading(false);
          navigation.navigate('Success');
        })
        .catch((e): any => {
          console.log(e);
        });
    } else {
      console.log('No orderID');
    }
  };

  return (
    <>
      <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
        <TouchableOpacity
          onPress={() => {
            setShowNextScreen(showNextScreen - 1);
          }}>
          <View>
            <BackIcon />
          </View>
        </TouchableOpacity>
        <ScrollView style={{width: '100%', marginBottom: 10}}>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>
              Review Booking
            </Text>
          </View>
          {/*Pickup and destinaiton Location */}
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
                  {bookingData?.From}
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
                  {bookingData?.To}
                </Text>
              </View>
            </View>
          </View>

          {/*Car Details which is selected */}
          <View>
            <View
              style={{
                width: 140,
                height: 140,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                marginHorizontal: 10,
                backgroundColor: '#ffae194e',
                borderWidth: 1,
                borderColor: '#FFAF19',
              }}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    height: 70,
                    width: 110,
                  }}>
                  <Image
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'contain',
                      borderRadius: 12,
                    }}
                    source={Vechicle_data[selectedVehicle || 0].image}
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
                        fontSize: 14,
                        fontWeight: 600,
                      }}>
                      {Vechicle_data[selectedVehicle || 0]?.title}
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{color: '#767676', fontSize: 8}}>
                      {`${
                        Vechicle_data[selectedVehicle || 0]?.capacity
                      } seater`}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 10,
                      paddingBottom: 10,
                    }}>
                    <Text
                      style={{
                        color: 'green',
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}>
                      From
                    </Text>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: 12,
                        paddingHorizontal: 5,
                      }}>
                      $
                      {selectedVehicle === 0
                        ? vehiclePricing?.van?.minimumFare
                        : selectedVehicle === 1
                        ? vehiclePricing?.miniBus?.minimumFare
                        : vehiclePricing?.bus?.minimumFare}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/*Cancilation Policy */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              padding: 20,
              width: '100%',
              borderRadius: 12,
              backgroundColor: '#ffae194e',
            }}>
            <View style={{width: '70%', flexDirection: 'column'}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Cancilation Policy{' '}
                </Text>
              </View>
              <View>
                <Text>
                  Cancellations made seven days or less before a trip are not
                  eligible for a refund
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => set_showCancilation(!showCancilation)}
                  style={{
                    width: 80,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    backgroundColor: '#FFAF19',
                  }}>
                  <Text>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/*Price Breakdown */}
          <View
            style={{
              marginVertical: 20,
              borderWidth: 1,
              borderRadius: 12,
              borderColor: '#4E4E4C',
              padding: 10,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#4E4E4C',
                }}>
                Price Breakdown
              </Text>
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{flex: 3}}>
                  {/* Base Price Section */}
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                      marginBottom: 10,
                      fontWeight: '500',
                    }}>
                    Distance
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                      marginBottom: 10,
                      fontWeight: '500',
                    }}>
                    Base Fee
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                      marginBottom: 10,
                      fontWeight: '500',
                    }}>
                    Distance Charge
                  </Text>

                  {/* Additional Features Section */}
                  {additionalCosts.extraVehicles.count > 0 && (
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#4E4E4C',
                        marginTop: 5,
                        marginBottom: 10,
                        fontWeight: '500',
                      }}>{`Additional Vehicles (${additionalCosts.extraVehicles.count})`}</Text>
                  )}

                  {additionalCosts.hourlyBooking.hours > 0 && (
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#4E4E4C',
                        marginTop: 5,
                        marginBottom: 10,
                        fontWeight: '500',
                      }}>{`Hourly Booking (${additionalCosts.hourlyBooking.hours} hrs)`}</Text>
                  )}

                  {additionalCosts.splitPayment.enabled && (
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#4E4E4C',
                        marginTop: 5,
                        marginBottom: 10,
                        fontWeight: '500',
                      }}>
                      Split Payment Fee
                    </Text>
                  )}

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#FFAF19',
                      marginTop: 10,
                    }}>
                    Grand Total
                  </Text>
                </View>
                <View
                  style={{flex: 2, paddingLeft: 50, alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                      marginBottom: 10,
                    }}>{`${parseFloat(distance || 0).toFixed(2)} Km`}</Text>

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                      marginBottom: 10,
                    }}>{`$ ${parseFloat(
                    Selected_vechile_pricing?.minimumFare || 0,
                  ).toFixed(2)}`}</Text>

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                      marginBottom: 10,
                    }}>{`$ ${distanceCharge.toFixed(2)}`}</Text>

                  {/* Additional Features Costs */}
                  {additionalCosts.extraVehicles.count > 0 && (
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#4E4E4C',
                        marginTop: 5,
                        marginBottom: 10,
                      }}>{`$ ${additionalCosts.extraVehicles.cost.toFixed(
                      2,
                    )}`}</Text>
                  )}

                  {additionalCosts.hourlyBooking.hours > 0 && (
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#4E4E4C',
                        marginTop: 5,
                        marginBottom: 10,
                      }}>{`$ ${additionalCosts.hourlyBooking.cost.toFixed(
                      2,
                    )}`}</Text>
                  )}

                  {additionalCosts.splitPayment.enabled && (
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#4E4E4C',
                        marginTop: 5,
                        marginBottom: 10,
                      }}>
                      $ 30.00
                    </Text>
                  )}

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#FFAF19',
                      marginTop: 10,
                    }}>{`$ ${grandTotal.toFixed(2)}`}</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              padding: 15,
              borderRadius: 10,
              flexDirection: 'row',
              borderWidth: 2,
              borderColor: '#FFAF19',
            }}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                Have a Question ?
              </Text>
              <Text style={{fontSize: 14, fontWeight: 'semibold'}}>
                Feel free to contact us
              </Text>
            </View>
            <View>
              <View>
                <TouchableHighlight
                  onPress={() => {
                    const phoneNumber = '+61481722473'; // Replace with your support phone number
                    Linking.openURL(`tel:${phoneNumber}`);
                  }}>
                  <Phone_Icon />
                </TouchableHighlight>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              marginTop: 10,
              paddingHorizontal: 16, // Add horizontal padding if needed
            }}>
            <TouchableOpacity
              disabled={ServerLoading}
              style={{
                backgroundColor: '#FFAF19',
                width: '100%', // Changed from 90% to 100%
                padding: 10,
                borderRadius: 12,
                paddingVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={_LocalhandleBooking}>
              {ServerLoading || localLoading ? (
                <ActivityIndicator size={'small'} color={'#333'} />
              ) : (
                <Text
                  style={{
                    color: '#333',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {'Book Ride '}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/*Cancilation Model for cancilation detail button */}
      <Modal
        visible={showCancilation}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleCancilationPolicyModel}>
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={toggleCancilationPolicyModel}>
          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.5,
              padding: 20,
            }}>
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Cancellation policy
              </Text>
              <Pressable onPress={toggleCancilationPolicyModel}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>✕</Text>
              </Pressable>
            </View>

            <View
              style={{height: 1, backgroundColor: '#ddd', marginBottom: 20}}
            />

            {/* Body */}
            <Text style={{fontSize: 16, marginBottom: 10, fontWeight: 'bold'}}>
              Cancellations made seven days or less before a trip are not
              eligible for a refund.
            </Text>
            <View style={{gap: 10}}>
              <Text
                style={{fontSize: 16, marginBottom: 10, fontWeight: 'bold'}}>
                • <Text style={{fontWeight: 'bold'}}>100% refund:</Text>{' '}
                Cancellation is at least 30 days before trip date.
              </Text>
              <Text
                style={{fontSize: 16, marginBottom: 10, fontWeight: 'bold'}}>
                • <Text style={{fontWeight: 'bold'}}>50% refund:</Text>{' '}
                Cancellation is between 29 and 8 days before trip date.
              </Text>
              <Text
                style={{fontSize: 16, marginBottom: 10, fontWeight: 'bold'}}>
                • <Text style={{fontWeight: 'bold'}}>No refund:</Text>{' '}
                Cancellation is 7 or less days from trip date.
              </Text>
            </View>

            {/* Footer */}
            <Button
              title="Got it"
              onPress={toggleCancilationPolicyModel}
              color="#f59e0b"
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default FinalBookingScreen;
