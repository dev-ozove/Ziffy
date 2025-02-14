// src/screens/LoginScreen.js
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import MainLogo from '../../../assests/Logo_main.svg';

//Importing logos for google, facebook and apple login
import Google from '../../../assests/login/google.svg';
import Facebook from '../../../assests/login/facebook.svg';
import Apple from '../../../assests/login/apple.svg';
import auth from '@react-native-firebase/auth';

import PhoneInput from 'react-native-phone-number-input';
import {useAuth} from '../../Context/authContext';

const LoginScreen = ({navigation}: any) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  const [confirm, setConfirm] = useState(null);

  const {signInWithGoogle, sendOtp, confirmOtp, isOtpSent} = useAuth();
  const [code, setCode] = useState('');
  const [localOtpSent, setLocalOtpSent] = useState(false);

  // Handle login
  function onAuthStateChanged(user: any) {
    if (user) {
      navigation.replace('MainDrawer');
    }
  }
  // Sync with context state
  useEffect(() => {
    setLocalOtpSent(isOtpSent);
  }, [isOtpSent]);

  const handleLogin = async () => {
    try {
      await sendOtp(formattedValue);
    } catch (error) {
      //alert('Failed to send OTP: ' + error.message);
      console.log('Failed to send OTP: ' + error.message);
    }
  };

  const confirmCode = async () => {
    try {
      await confirmOtp(code);
    } catch (error) {
      //alert('Invalid OTP code');
      console.log('Invalid OTP');
    }
  };

  // // Handle the button press
  // async function signInWithPhoneNumber(phoneNumber: any) {
  //   const confirmation = await auth()
  //     .signInWithPhoneNumber(phoneNumber)
  //     .then((e: any) => {
  //       console.log('OTP has been sent to the user: ', phoneNumber);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  //   setConfirm(confirmation);
  // }

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  if (!confirm) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <View style={{marginTop: 100}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{marginBottom: 10}}>
              <Text
                style={{fontSize: 30, fontWeight: 'bold', color: '#141921'}}>
                Welcome to{' '}
              </Text>
            </View>
            <MainLogo />

            <Text
              style={{
                color: '#333',
                fontWeight: 700,
                fontSize: 28,
                marginTop: 5,
              }}>
              Login to your account
            </Text>
            <Text
              style={{
                color: '#333',
                fontWeight: 400,
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
                  color: '#333',
                  fontWeight: 600,
                  marginBottom: 5,
                  alignSelf: 'flex-start',
                  marginLeft: 10,
                }}>
                Mobile No.
              </Text>
              {/*Phone Number Input Section */}
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                containerStyle={{
                  backgroundColor: '#fff',
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 14,
                }}
                textContainerStyle={{
                  backgroundColor: '#fff',
                  borderRadius: 14,
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
              />
            </View>
            <View>
              {/*Login Button Section */}
              <TouchableOpacity
                onPress={handleLogin}
                style={{
                  marginTop: 10,
                  height: 50,
                  backgroundColor: '#FFAF19',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#333', fontWeight: 600, fontSize: 16}}>
                  Continue
                </Text>
              </TouchableOpacity>
              <Text style={{color: '#333', alignSelf: 'center', marginTop: 5}}>
                Or Continue Using
              </Text>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View style={{margin: 10, flex: 1}}>
                  {/* Google Sign-In Button */}
                  <TouchableOpacity
                    onPress={handleGoogleLogin}
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                      paddingVertical: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 20,
                    }}>
                    <Google style={{marginRight: 10}} width={20} height={20} />
                    <Text
                      style={{color: '#333', fontWeight: '600', fontSize: 16}}>
                      Sign in with Google
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 20, flexDirection: 'row'}}>
                <Text style={{color: '#333'}}>
                  By continuing , you agree to our
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#FFAF19',
                      textDecorationLine: 'underline',
                      marginLeft: 5,
                    }}>
                    terms and conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <>
        <TextInput value={code} onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </>
    );
  }
};

export default LoginScreen;
