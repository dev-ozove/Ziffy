import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import {useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';
import BackendConstants from '../../../Config/Config';
import {getAuth} from '@react-native-firebase/auth';
import LoaderZiffy from '../components/Loader/LoaderZiffy';
export default function PaymentScreen({navigation}) {
  const sampleData = {
    OrderId: 'ORD123456',
    userName: 'John Doe',
    fare: 45.5,
    fromLocation: {latitude: 37.7749, longitude: -122.4194}, // San Francisco
    toLocation: {latitude: 34.0522, longitude: -118.2437}, // Los Angeles
  };
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [paymentIntent, setPaymentIntent] = useState<any>(null);
  const [localLoading, set_localLoading] = useState(false);

  const auth = getAuth();
  const goBack = () => {
    navigation.goBack();
  };

  const setup = async () => {
    console.log('Initializing Payment Sheet...');
    if (!paymentIntent?.paymentIntent?.client_secret) {
      console.error('Error: PaymentIntent client_secret is null or undefined.');
      return;
    }

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      paymentIntentClientSecret: paymentIntent.paymentIntent.client_secret, // Use the client_secret here
    });

    if (error) {
      console.error('Error initializing Payment Sheet:', error);
    } else {
      console.log('Payment Sheet initialized successfully.');
    }
  };

  const checkout = async () => {
    console.log('Presenting Payment Sheet...');
    const {error} = await presentPaymentSheet();

    if (error) {
      console.error('Error presenting Payment Sheet:', error);
    } else {
      console.log('Payment Successful!');
    }
  };

  const getThePaymentIntent = async () => {
    console.log('Fetching Payment Intent from server...');
    try {
      const response = await axios.post(
        `${BackendConstants.Url}/create-payment-intent`,
        {
          amount: 5000,
          currency: 'usd',
          paymentMethodType: 'card',
          metadata: {
            userId: auth?.currentUser?.uid || 'guest_user',
            bookingId: 'booking_456',
          },
        },
      );
      const data = response.data;
      console.log('Payment Intent fetched:', data);
      setPaymentIntent(data); // Store the entire response
    } catch (error) {
      console.error('Error fetching Payment Intent:', error);
    }
  };

  const _handleBooking = async () => {
    console.log('Handling booking...');
    set_localLoading(true);

    try {
      console.log('Step 1: Fetching Payment Intent...');
      await getThePaymentIntent();

      console.log('Step 2: Setting up Payment Sheet...');
      await setup();

      console.log('Step 3: Checking out...');
      await checkout();
    } catch (error) {
      console.error('Error during booking process:', error);
    } finally {
      console.log('Booking process completed.');
      set_localLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFEFD5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Screen</Text>
      </View> */}

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Map Section */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude:
                (sampleData.fromLocation.latitude +
                  sampleData.toLocation.latitude) /
                2,
              longitude:
                (sampleData.fromLocation.longitude +
                  sampleData.toLocation.longitude) /
                2,
              latitudeDelta:
                Math.abs(
                  sampleData.fromLocation.latitude -
                    sampleData.toLocation.latitude,
                ) + 5,
              longitudeDelta:
                Math.abs(
                  sampleData.fromLocation.longitude -
                    sampleData.toLocation.longitude,
                ) + 5,
            }}>
            <Marker
              coordinate={sampleData.fromLocation}
              title="From Location"
              description="San Francisco"
            />
            <Marker
              coordinate={sampleData.toLocation}
              title="To Location"
              description="Los Angeles"
            />
          </MapView>
        </View>

        {/* Booking Details */}
        <View style={styles.detailsContainer}>
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

          {/*Total Passengers */}
          <View
            style={{
              marginTop: 10,
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
                Total passengers
              </Text>
              <Text style={{fontSize: 16, color: '#4E4E4C'}}>25</Text>
            </View>
          </View>

          {/*Price Breakdown */}
          <View
            style={{
              marginTop: 10,
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
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    Base Fee
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    Distance Charge
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    Time Charge
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    Tax
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  {/*Base Fee */}
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    $10.00
                  </Text>
                  {/*Distance Charge */}

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    $37.00
                  </Text>
                  {/*Time Charge */}

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    $22.00
                  </Text>
                  {/*Tax*/}

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    $1.40
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{width: '80%'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#FFAF19',
                    }}>
                    Total Amount Per Person
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#FFAF19',
                    }}>
                    $10.40
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={_handleBooking}
              style={{
                width: '100%',
                backgroundColor: '#FFAF19',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                paddingVertical: 20,
              }}>
              {localLoading ? (
                <LoaderZiffy />
              ) : (
                <Text
                  style={{
                    color: '#333',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {'Pay Now'}
                </Text>
              )}
            </TouchableOpacity>

            <View style={{marginVertical: 10, width: '100%'}}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#FFAF19',

                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                  paddingVertical: 20,
                }}>
                {false ? (
                  <ActivityIndicator size={'small'} color={'#333'} />
                ) : (
                  <Text
                    style={{
                      color: '#FFAF19',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {'Cancel'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFD5', // Pale Papaya
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500', // Orange
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFEFD5',
  },
  content: {
    padding: 0,
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#FFA500',
  },
  mapContainer: {
    height: 300,
    overflow: 'hidden',
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
});
