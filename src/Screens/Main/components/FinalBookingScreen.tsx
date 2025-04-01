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
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import BackIcon from '../../../../assets/back_icon.svg';
import Phone_Icon from '../../../../assets/PhoneIcon.svg';
import Email_Icon from '../../../../assets/EmailIcon.svg';
import {styles} from '../../../Components/MainStyles';
import PickupLocationIcon from '../../../../assets/Pickup_icon.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Avatar from '../../../../assets/Avatar.svg';
import Icon1 from 'react-native-vector-icons/Ionicons';

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
  sendVehicleData: any;
  setSendVehicleData: any;
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
  sendVehicleData,
  setSendVehicleData,
}) => {
  const {bookingData} = useOzove();
  const [localLoading, set_localLoading] = useState(false);
  const [OrderID, setOrderID] = useState<string>('');
  const {_handleBooking, _update_BookingData, Generate_OrderID} = useOzove();
  const auth = getAuth();
  const navigation = useNavigation<any>();
  console.log(vehiclePricing);
  console.log('sendVehicleData >>> ', sendVehicleData);

  const getTheOrderID = async () => {
    const orderID = Generate_OrderID();
    setOrderID(orderID);
  };

  useEffect(() => {
    getTheOrderID();
  }, []);

  const handleEmailPress = async () => {
    const emailURL =
      'mailto:support@example.com?subject=App Feedback&body=Hello Team,';

    try {
      const supported = await Linking.canOpenURL(emailURL).catch(
        (error: any) => {
          console.log(error);
        },
      );
      if (supported) {
        await Linking.openURL(emailURL);
      } else {
        Alert.alert('Error', 'No email client installed');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open email client');
    }
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

    if (OrderID) {
      await _handleBooking(OrderID, sendVehicleData)
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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingHorizontal: 5,
        }}>
        <ScrollView style={{width: '100%', marginBottom: 10}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
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
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'DMSans36pt-ExtraBold',
                  color: '#141921',
                  fontSize: 24,
                }}>
                Review Booking
              </Text>
            </View>
          </View>
          <Text style={{marginVertical: 2, fontSize: 13, fontWeight: '700'}}>
            {`${bookingData?.Date}  (${bookingData?.Time})`}
          </Text>
          <Text style={{fontSize: 13, color: '#F8AB1E', fontWeight: '700'}}>
            Order <Text style={{color: '#F8AB1E'}}>{OrderID}</Text>
          </Text>
          {/*Pickup and destinaiton Location */}
          <View style={{width: '100%', marginTop: 10}}>
            <View style={{marginBottom: 10, gap: 10}}>
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
                  {bookingData?.From}
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
                height: 130,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
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
                    source={{uri: sendVehicleData?.image}}
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
                        color: '#000',
                        fontFamily: 'DMSans36pt-SemiBold',
                        fontSize: 14,
                      }}>
                      {sendVehicleData?.title}
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={{color: '#767676', fontSize: 8}}>
                      {`${sendVehicleData?.capacity} seater`}
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
                        color: '#141921',
                        fontFamily: 'DMSans36pt-SemiBold',
                        fontSize: 14,
                        paddingHorizontal: 5,
                      }}>
                      ${sendVehicleData?.price}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/*Cancilation Policy */}
          {/* <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              padding: 20,
              width: '100%',
              borderRadius: 8,
              backgroundColor: '#ffae194e',
            }}>
            <View style={{width: '70%', flexDirection: 'column'}}>
              <View>
                <Text
                  style={{
                    color: '#141921',
                    fontFamily: 'DMSans36pt-SemiBold',
                    fontSize: 14,
                    marginBottom: 4,
                  }}>
                  Cancilation Policy
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'DMSans36pt-Regular',
                    fontSize: 10,
                    width: '80%',
                    color: '#141921',
                  }}>
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
          </View> */}

          <View
            style={{
              borderWidth: 1,
              padding: 8,
              borderRadius: 5,
              borderColor: '#ccc',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontFamily: 'DMSans36pt-SemiBold',
                fontSize: 20,
                marginBottom: 5,
                color: '#141921',
              }}>
              Total Passengers
            </Text>
            <Text
              style={{
                fontFamily: 'DMSans36pt-SemiBold',
                fontSize: 16,
                color: '#141921',
              }}>{`Minimum ${sendVehicleData?.details?.minimum_capacity} Maximum ${sendVehicleData?.details?.maximum_capacity}`}</Text>
          </View>

          {/*Price Breakdown */}
          <View
            style={{
              marginVertical: 10,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#ccc',
              padding: 10,
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'DMSans36pt-SemiBold',
                  fontSize: 20,
                  color: '#141921',
                }}>
                Price Breakdown
              </Text>
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{flex: 6}}>
                  {/* Base Price Section */}
                  <Text
                    style={{
                      marginTop: 5,
                      marginBottom: 4,
                      fontFamily: 'DMSans36pt-Regular',
                      fontSize: 12,
                      color: '#141921',
                    }}>
                    Distance
                  </Text>
                  <Text
                    style={{
                      marginBottom: 4,
                      fontFamily: 'DMSans36pt-Regular',
                      fontSize: 12,
                      color: '#141921',
                    }}>
                    Base Fee
                  </Text>
                  <Text
                    style={{
                      marginBottom: 4,
                      fontFamily: 'DMSans36pt-Regular',
                      fontSize: 12,
                      color: '#141921',
                    }}>
                    Distance Charge
                  </Text>

                  {/* Additional Features Section */}
                  {additionalCosts.extraVehicles.count > 0 && (
                    <Text
                      style={{
                        marginBottom: 4,
                        fontFamily: 'DMSans36pt-Regular',
                        fontSize: 12,
                        color: '#141921',
                      }}>{`Additional Vehicles (${additionalCosts.extraVehicles.count})`}</Text>
                  )}

                  {additionalCosts.hourlyBooking.hours > 0 && (
                    <Text
                      style={{
                        marginBottom: 4,
                        fontFamily: 'DMSans36pt-Regular',
                        fontSize: 12,
                        color: '#141921',
                      }}>{`Hourly Booking (${additionalCosts.hourlyBooking.hours} hrs)`}</Text>
                  )}

                  {additionalCosts.splitPayment.enabled && (
                    <Text
                      style={{
                        marginBottom: 4,
                        fontFamily: 'DMSans36pt-Regular',
                        fontSize: 12,
                        color: '#141921',
                      }}>
                      Split Payment Fee
                    </Text>
                  )}

                  <Text
                    style={{
                      fontFamily: 'DMSans36pt-SemiBold',
                      fontSize: 20,
                      color: '#FFAF19',
                      marginTop: 8,
                    }}>
                    Total Amount Per Person
                  </Text>
                </View>
                <View
                  style={{flex: 2, paddingLeft: 50, alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      marginLeft: 18,
                      fontFamily: 'DMSans36pt-Regular',
                      fontSize: 12,
                      color: '#141921',
                    }}>{`${parseFloat(distance || 0).toFixed(2)} Km`}</Text>

                  <Text
                    style={{
                      marginBottom: 4,
                      marginLeft: 18,
                      fontFamily: 'DMSans36pt-Regular',
                      fontSize: 12,
                      color: '#141921',
                    }}>{`$ ${parseFloat(
                    Selected_vechile_pricing?.minimumFare || 0,
                  ).toFixed(2)}`}</Text>

                  <Text
                    style={{
                      marginBottom: 4,
                      marginLeft: 18,
                      fontFamily: 'DMSans36pt-Regular',
                      fontSize: 12,
                      color: '#141921',
                    }}>{`$ ${distanceCharge.toFixed(2)}`}</Text>

                  {/* Additional Features Costs */}
                  {additionalCosts.extraVehicles.count > 0 && (
                    <Text
                      style={{
                        marginBottom: 4,
                        marginLeft: 18,
                        fontFamily: 'DMSans36pt-Regular',
                        fontSize: 12,
                        color: '#141921',
                      }}>{`$ ${additionalCosts.extraVehicles.cost.toFixed(
                      2,
                    )}`}</Text>
                  )}

                  {additionalCosts.hourlyBooking.hours > 0 && (
                    <Text
                      style={{
                        marginBottom: 4,
                        marginLeft: 18,
                        fontFamily: 'DMSans36pt-Regular',
                        fontSize: 12,
                        color: '#141921',
                      }}>{`$ ${additionalCosts.hourlyBooking.cost.toFixed(
                      2,
                    )}`}</Text>
                  )}

                  {additionalCosts.splitPayment.enabled && (
                    <Text
                      style={{
                        marginBottom: 4,
                        marginLeft: 18,
                        fontFamily: 'DMSans36pt-Regular',
                        fontSize: 12,
                        color: '#141921',
                      }}>
                      $ 30.00
                    </Text>
                  )}

                  <Text
                    style={{
                      fontFamily: 'DMSans36pt-SemiBold',
                      fontSize: 18,
                      color: '#FFAF19',
                      marginTop: 8,
                    }}>{`$ ${grandTotal.toFixed(2)}`}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* <TouchableOpacity
            style={styles.card}
            // onPress={() => setShowPaymentView(true)}
            activeOpacity={0.7}>
            <Text style={styles.header}>Payment Method</Text>
            <View style={styles.row}>
              <View style={styles.iconContainer1}>
                <Avatar />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.personalText}>Personal</Text>
                <Text style={styles.cardText}>Visa 0493</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#868886" />
            </View>
          </TouchableOpacity> */}

          <View
            style={{
              padding: 15,
              borderRadius: 10,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#ccc',
            }}>
            <View style={{flex: 1}}>
              <Text style={{fontFamily: 'DMSans36pt-SemiBold', fontSize: 16}}>
                Have a Question ?
              </Text>
              <Text
                style={{
                  fontFamily: 'DMSans36pt-Regular',
                  fontSize: 14,
                  width: '90%',
                }}>
                Contact Robert anytime for help with your booking
              </Text>
            </View>
            <View>
              <View style={styles.containerButton}>
                <TouchableOpacity
                  style={styles.iconButtonFinal}
                  onPress={() => {
                    const phoneNumber = '+61481722473'; // Replace with your support phone number
                    Linking.openURL(`tel:${phoneNumber}`);
                  }}>
                  {/* <Icon1 name="call-outline" size={24} color="#000" /> */}
                  <Phone_Icon />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconButtonFinal}
                  onPress={handleEmailPress}>
                  {/* <Icon1 name="mail-outline" size={24} color="#000" /> */}
                  <Email_Icon />
                </TouchableOpacity>
              </View>

              {/* <View>
                <TouchableHighlight
                  onPress={() => {
                    const phoneNumber = '+61481722473'; // Replace with your support phone number
                    Linking.openURL(`tel:${phoneNumber}`);
                  }}>
                  <Phone_Icon />
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    const phoneNumber = '+61481722473'; // Replace with your support phone number
                    Linking.openURL(`tel:${phoneNumber}`);
                  }}>
                  <Phone_Icon />
                </TouchableHighlight>
              </View> */}
            </View>
          </View>
          <Text
            style={{
              fontFamily: 'DMSans36pt-Regular',
              fontSize: 14,
              paddingHorizontal: 5,
              marginVertical: 10,
            }}>
            By selecting <Text style={{fontWeight: 'bold'}}>Book Ride</Text>,
            you agree to our{' '}
            <Text
              style={{textDecorationLine: 'underline', fontWeight: 'bold'}}
              onPress={() =>
                Linking.openURL('https://your-cancellation-policy-url.com')
              }>
              Cancellation policy
            </Text>{' '}
            and Ozove{' '}
            <Text
              style={{textDecorationLine: 'underline', fontWeight: 'bold'}}
              onPress={() => Linking.openURL('https://your-terms-url.com')}>
              terms and conditions
            </Text>
          </Text>
          <View
            style={{
              width: '100%',
              marginTop: 10,
              paddingHorizontal: 5, // Add horizontal padding if needed
            }}>
            <TouchableOpacity
              disabled={ServerLoading}
              style={{
                backgroundColor: '#FFAF19',
                width: '100%', // Changed from 90% to 100%
                padding: 10,
                borderRadius: 5,
                paddingVertical: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={_LocalhandleBooking}>
              {ServerLoading || localLoading ? (
                <ActivityIndicator size={'small'} color={'#333'} />
              ) : (
                <Text
                  style={{
                    fontFamily: 'DMSans36pt-ExtraBold',
                    color: '#141921',
                    fontSize: 24,
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
