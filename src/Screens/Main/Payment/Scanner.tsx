import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

export default function Scanner({navigation}: any) {
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, set_error] = useState('');

  // Reset scanner state on screen focus
  useFocusEffect(
    useCallback(() => {
      setScannedData(null);
      set_error('');
    }, []),
  );

  const onRead = (e: any) => {
    try {
      const parsedData = JSON.parse(e.data); // Parse the string as JSON
      if (parsedData.OrderId) {
        setScannedData(`Order ID: ${parsedData.OrderId}`); // Display Order ID
        navigation.push('Payment_screen', {OrderId: parsedData.OrderId});
        set_error(''); // Clear any previous error
      } else {
        set_error('Invalid QR Code Try Again ');
        setScannedData(null);
      }
    } catch (err) {
      set_error('Invalid QR Code Try Again.... ');
      setScannedData(null);
    }
  };

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled);
  };

  return (
    <View style={styles.container}>
      {/* Display the scanned result */}
      {scannedData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{scannedData}</Text>
        </View>
      )}
      {error && (
        <View style={styles.resultContainer}>
          <Text style={[styles.resultText, {color: 'red', fontWeight: 'bold'}]}>
            {error}
          </Text>
        </View>
      )}

      {/* QR Code Scanner */}
      <QRCodeScanner
        onRead={onRead}
        flashMode={
          flashEnabled
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        containerStyle={styles.scannerContainer}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
        cameraStyle={styles.cameraStyle}
      />

      {/* Flash Icon */}
      <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
        <Icon
          name={flashEnabled ? 'flashlight' : 'flashlight-off'}
          size={30}
          color="white"
        />
      </TouchableOpacity>

      {/* Bottom Instructions */}
      <View style={styles.bottomContent}>
        <Text style={styles.instructionText}>
          Align the QR code within the frame to scan
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
  resultContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 8,
  },
  scannerContainer: {
    flex: 1,
  },
  cameraStyle: {
    height: '100%',
    width: '100%',
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  flashButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 10,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
