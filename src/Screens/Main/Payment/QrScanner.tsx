import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import ScannerLogo from '../../../../assests/Scanner/scanner_logo.svg';

const {width} = Dimensions.get('window');

const QrScanner = ({navigation}: any) => {
  return (
    <>
      <StatusBar backgroundColor={'#FFEFD5'} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Svg
            height="100%"
            width="100%"
            viewBox="0 0 1440 320"
            style={styles.headerWave}>
            <Path
              fill="#FFEFD5"
              d="M0,64L60,96C120,128,240,192,360,192C480,192,600,128,720,117.3C840,107,960,149,1080,160C1200,171,1320,149,1380,138.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </Svg>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{translateY: -50}],
          }}>
          <ScannerLogo />
        </View>

        <View style={styles.wavyContainer}>
          <Svg
            height="100%"
            width="100%"
            viewBox="0 140 1440 320"
            style={styles.svg}>
            <Path
              fill="#FFEFD1" // Same as the beige background color
              d="M0,96L60,122.7C120,149,240,203,360,202.7C480,203,600,149,720,138.7C840,128,960,160,1080,160C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </Svg>
        </View>
        <View style={{bottom: 20}}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Scan to Check In</Text>
            <Text style={styles.description}>
              Dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                navigation.push('Payment_screen');
              }}>
              <Text style={styles.buttonText}>Let’s Ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
    height: 100, // Adjust height for your design
    backgroundColor: '#FFEFD5',
  },
  headerWave: {
    position: 'absolute',
    bottom: -90,
  },
  wavyContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 250,
    backgroundColor: '#FFEFD1',
  },
  svg: {
    position: 'absolute',
    top: -50, // Adjust the SVG to overlap the red square
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
  },

  textContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rideText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default QrScanner;
