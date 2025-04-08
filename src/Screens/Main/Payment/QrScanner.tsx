import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const SCANNER_SIZE = width * 0.7;

// Custom icon components
const CloseIcon = () => (
  <View style={styles.iconContainer}>
    <View style={[styles.iconLine, styles.iconLineHorizontal]} />
    <View style={[styles.iconLine, styles.iconLineVertical]} />
  </View>
);

const FlashIcon = ({isOn}: {isOn: boolean}) => (
  <View style={styles.iconContainer}>
    <View style={[styles.flashIcon, isOn && styles.flashIconOn]} />
    <View style={[styles.flashIconBase, isOn && styles.flashIconBaseOn]} />
  </View>
);

function QrScanner() {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [scannedCode, setScannedCode] = useState(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
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
      <View style={styles.container}>
        <Text>Device Not Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
        torch={isFlashOn ? 'on' : 'off'}
      />

      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <CloseIcon />
      </TouchableOpacity>

      {/* Flash Toggle Button */}
      <TouchableOpacity
        style={styles.flashButton}
        onPress={() => setIsFlashOn(!isFlashOn)}>
        <FlashIcon isOn={isFlashOn} />
      </TouchableOpacity>

      {/* Scanner Frame */}
      <View style={styles.scannerFrame}>
        <View style={styles.scannerBox}>
          {/* Corner Markers */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          Position the QR code within the frame
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  flashButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  scannerFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBox: {
    width: SCANNER_SIZE,
    height: SCANNER_SIZE,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#FFAF19',
  },
  topLeft: {
    top: -2,
    left: -2,
    borderLeftWidth: 4,
    borderTopWidth: 4,
  },
  topRight: {
    top: -2,
    right: -2,
    borderRightWidth: 4,
    borderTopWidth: 4,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionsText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  // Custom icon styles
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLine: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
  iconLineHorizontal: {
    width: 20,
    height: 2,
    transform: [{rotate: '45deg'}],
  },
  iconLineVertical: {
    width: 2,
    height: 20,
    transform: [{rotate: '45deg'}],
  },
  flashIcon: {
    width: 12,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 2,
    position: 'absolute',
    top: 0,
  },
  flashIconOn: {
    backgroundColor: '#FFAF19',
    borderColor: '#FFAF19',
  },
  flashIconBase: {
    width: 8,
    height: 8,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4,
    position: 'absolute',
    bottom: 0,
  },
  flashIconBaseOn: {
    backgroundColor: '#FFAF19',
    borderColor: '#FFAF19',
  },
});

export default QrScanner;
