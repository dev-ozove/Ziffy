import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

function QrScanner() {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [scannedCode, setScannedCode] = useState(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const lastFetchedUid = useRef(null);
  const navigation = useNavigation<any>();

  // Request camera permission on component mount
  React.useEffect(() => {
    requestPermission();
  }, []);

  // Configure the code scanner to only process QR codes
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      const codeValue = codes[0]?.value;
      if (codeValue) {
        try {
          const parsed = JSON.parse(codeValue);
          if (parsed.booking_uid && parsed.user_uid) {
            setScannedCode((prev: any) => {
              if (!prev || prev.booking_uid !== parsed.booking_uid) {
                return parsed;
              }
              return prev;
            });
          }
        } catch (e) {
          console.log('Invalid JSON format');
        }
      }
    },
  });

  // Fetch booking details when a new valid QR code is scanned
  useEffect(() => {
    if (scannedCode) {
      const {booking_uid, user_uid} = scannedCode;
      if (booking_uid !== lastFetchedUid.current) {
        lastFetchedUid.current = booking_uid;
        fetchBooking(user_uid, booking_uid);
      }
    }
  }, [scannedCode]);

  // Function to fetch booking details from Firestore
  const fetchBooking = async (userUid: string, bookingUid: string) => {
    try {
      await firestore()
        .collection('bookings')
        .doc(userUid)
        .collection('individual_bookings')
        .doc(bookingUid)
        .get()
        .then(bookingSnap => {
          if (bookingSnap.exists) {
            const data = bookingSnap.data();
            navigation.navigate('Checking_screen', {bookingDetails: data});
          }
        })
        .catch((error: any) => {
          console.log('Booking not found');
          setBookingDetails(null);
          console.log(error);
        });
    } catch (error) {
      console.error('Error fetching booking:', error);
      setBookingDetails(null);
    }
  };

  // Handle case where no camera device is found
  if (device == null) {
    return (
      <View>
        <Text>Device Not Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
      />
      {bookingDetails && (
        <View style={styles.bookingContainer}>
          <Text style={styles.bookingTitle}>Booking Details:</Text>
          <Text style={styles.bookingText}>
            {JSON.stringify(bookingDetails, null, 2)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  bookingText: {
    fontSize: 14,
    color: 'white',
  },
});

export default QrScanner;
