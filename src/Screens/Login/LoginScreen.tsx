// src/screens/LoginScreen.js
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Modal,
} from 'react-native';
import MainLogo from '../../../assets/Logo_main.svg';

//Importing logos for google, facebook and apple login
import auth from '@react-native-firebase/auth';

import PhoneInput from 'react-native-phone-number-input';
import {useAuth} from '../../Context/authContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PermissionHandler from '../../Components/PermissionHandler';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}: any) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef<PhoneInput>(null);
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);

  const {signInWithGoogle, sendOtp, isOtpSent} = useAuth();

  // Handle login
  function onAuthStateChanged(user: any) {
    if (user) {
      navigation.replace('MainDrawer');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const checkInitialPermissions = async () => {
      const permissionsToCheck =
        Platform.OS === 'ios'
          ? {
              camera: PERMISSIONS.IOS.CAMERA,
              location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            }
          : {
              camera: PERMISSIONS.ANDROID.CAMERA,
              location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            };

      try {
        const [cameraResult, locationResult] = await Promise.all([
          check(permissionsToCheck.camera),
          check(permissionsToCheck.location),
        ]);

        const allGranted =
          cameraResult === RESULTS.GRANTED &&
          locationResult === RESULTS.GRANTED;

        setShowPermissions(!allGranted);
      } catch (error) {
        console.error('Error checking initial permissions:', error);
        setShowPermissions(true);
      }
    };

    checkInitialPermissions();
  }, []);

  // In handleLogin function
  const handleLogin = async () => {
    if (!phoneInput.current?.isValidNumber(formattedValue)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    try {
      setLoading(true);
      await sendOtp(formattedValue);
      navigation.navigate('Verify', {
        phoneNumber: formattedValue,
      });
    } catch (error: any) {
      console.log('Error sending OTP:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to send verification code. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      console.log('Google Sign-in error:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to sign in with Google. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionsGranted = () => {
    setShowPermissions(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Modal
        visible={showPermissions}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowPermissions(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              width: '90%',
              maxHeight: '80%',
              padding: 16,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
            <PermissionHandler
              onPermissionsGranted={handlePermissionsGranted}
            />
          </View>
        </View>
      </Modal>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingBottom: Platform.OS === 'ios' ? hp('10%') : hp('5%'),
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              paddingHorizontal: wp('5%'),
            }}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <View style={{marginBottom: hp('2%')}}>
                <Text
                  style={{
                    fontSize: wp('6%'),
                    fontFamily: 'DMSans36pt-SemiBold',
                    color: '#141921',
                    textAlign: 'center',
                  }}>
                  Welcome to{' '}
                </Text>
              </View>
              <MainLogo width={wp('40%')} height={wp('40%')} />
              <Text
                style={{
                  color: '#141921',
                  fontFamily: 'DMSans36pt-ExtraBold',
                  fontSize: wp('7%'),
                  marginVertical: hp('1%'),
                  textAlign: 'center',
                }}>
                Login to your account
              </Text>
              <Text
                style={{
                  color: '#141921',
                  fontFamily: 'DMSans36pt-Medium',
                  fontSize: wp('4%'),
                  textAlign: 'center',
                  marginBottom: hp('3%'),
                }}>
                Enter your details below to continue ordering
              </Text>
            </View>

            <View style={{width: '100%', marginTop: hp('2%')}}>
              <Text
                style={{
                  color: '#141921',
                  fontSize: wp('4.5%'),
                  fontFamily: 'DMSans36pt-SemiBold',
                  marginBottom: hp('1%'),
                  alignSelf: 'flex-start',
                }}>
                Mobile No.
              </Text>

              {/*Phone Number Input Section */}
              <PhoneInput
                ref={phoneInput}
                containerStyle={{
                  backgroundColor: '#fff',
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  height: hp('7%'),
                  paddingHorizontal: 10,
                  alignItems: 'center',
                }}
                textContainerStyle={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  height: '100%',
                  paddingVertical: 0,
                  justifyContent: 'center',
                }}
                textInputStyle={{
                  height: '100%',
                  fontSize: wp('4%'),
                  color: '#141921',
                  padding: 0,
                  margin: 0,
                }}
                codeTextStyle={{
                  fontSize: wp('4%'),
                  color: '#141921',
                  padding: 0,
                  margin: 0,
                  height: '100%',
                  textAlignVertical: 'center',
                }}
                flagButtonStyle={{
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                countryPickerButtonStyle={{
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                defaultCode="AU"
                layout="first"
                onChangeText={text => {
                  setValue(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                autoFocus
                withDarkTheme={false}
                withShadow={false}
              />

              {/*Login Button Section */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                style={{
                  marginTop: hp('3%'),
                  height: hp('7%'),
                  backgroundColor: loading ? '#A8A8A8' : '#FFAF19',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}>
                {loading ? (
                  <ActivityIndicator color="#333" size="small" />
                ) : (
                  <Text
                    style={{
                      color: '#333',
                      fontSize: wp('5%'),
                      fontFamily: 'DMSans36pt-SemiBold',
                    }}>
                    Continue
                  </Text>
                )}
              </TouchableOpacity>

              {/* Social Login Options - Uncomment if needed */}
              {/* <View style={{marginTop: hp('4%'), width: '100%'}}>
                <Text
                  style={{
                    color: '#141921',
                    fontSize: wp('4%'),
                    fontFamily: 'DMSans36pt-Medium',
                    textAlign: 'center',
                    marginBottom: hp('2%'),
                  }}>
                  Or continue with
                </Text>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity
                    onPress={handleGoogleLogin}
                    disabled={loading}
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 8,
                      paddingVertical: hp('2%'),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30%',
                      elevation: 1,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                    }}>
                    <Google width={wp('5%')} height={wp('5%')} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 8,
                      paddingVertical: hp('2%'),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30%',
                      elevation: 1,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                    }}>
                    <Facebook width={wp('5%')} height={wp('5%')} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 8,
                      paddingVertical: hp('2%'),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30%',
                      elevation: 1,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                    }}>
                    <Apple width={wp('5%')} height={wp('5%')} />
                  </TouchableOpacity>
                </View>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
