// src/screens/LoginScreen.js
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';
import MainLogo from '../../../assets/Logo_main.svg';

//Importing logos for google, facebook and apple login
import Google from '../../../assets/login/google.svg';
import Facebook from '../../../assets/login/facebook.svg';
import Apple from '../../../assets/login/apple.svg';
import auth from '@react-native-firebase/auth';

import PhoneInput from 'react-native-phone-number-input';
import {useAuth} from '../../Context/authContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = ({navigation}: any) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 30,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingTop: 40,
        }}>
        <View style={{}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: 'DMSans36pt-SemiBold',
                  color: '#141921',
                }}>
                Welcome to{' '}
              </Text>
            </View>
            <MainLogo />
            <Text
              style={{
                color: '#141921',
                fontFamily: 'DMSans36pt-ExtraBold',
                fontSize: 26,
                marginVertical: 5,
              }}>
              Login to your account
            </Text>
            <Text
              style={{
                color: '#141921',
                fontFamily: 'DMSans36pt-Medium',
                fontSize: 16,
              }}>
              Enter your details below to continue ordering
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
            }}>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  color: '#141921',
                  fontSize: 18,
                  fontFamily: 'DMSans36pt-SemiBold',
                  marginBottom: 5,
                  alignSelf: 'flex-start',
                  marginLeft: 10,
                }}>
                Mobile No.
              </Text>
              {/*Phone Number Input Section */}
              <PhoneInput
                ref={phoneInput}
                containerStyle={{
                  backgroundColor: '#fff',
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                }}
                textContainerStyle={{
                  backgroundColor: '#fff',
                  borderRadius: 14,
                }}
                defaultCode="IN"
                layout="first"
                onChangeText={text => {
                  setValue(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                autoFocus
              />
            </View>
            <View>
              {/*Login Button Section */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                style={{
                  marginTop: 10,
                  marginHorizontal: 11,
                  height: 50,
                  backgroundColor: loading ? '#A8A8A8' : '#FFAF19',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#333',
                    fontSize: 20,
                    fontFamily: 'DMSans36pt-SemiBold',
                  }}>
                  {loading ? 'Sending...' : 'Continue'}
                </Text>
              </TouchableOpacity>

              {/* <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View style={{flex: 1}}>
                  {/* Google Sign-In Button */}
              {/* <TouchableOpacity
                    onPress={handleGoogleLogin}
                    disabled={loading}
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                      paddingVertical: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                      opacity: loading ? 0.7 : 1,
                    }}>
                    <Google style={{marginRight: 10}} width={20} height={20} />
                    <Text
                      style={{
                        color: '#333',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
                      Sign in with Google
                    </Text>
                  </TouchableOpacity> 
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
