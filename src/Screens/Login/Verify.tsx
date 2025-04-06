import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import Lock from '../../../assets/login/Lock.svg';
import {OtpInput} from 'react-native-otp-entry';
import BackIcon from '../../../assets/Headers/Backicon.svg';
import {useAuth} from '../../Context/authContext';

export default function Verify({navigation, route}: any) {
  const [value, setValue] = useState('');
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const {confirmOtp, isOtpSent, sendOtp} = useAuth();
  const phoneNumber = route.params?.phoneNumber;

  useEffect(() => {
    if (!isOtpSent || !phoneNumber) {
      navigation.goBack();
    }
  }, [isOtpSent, phoneNumber]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown, canResend]);

  const handleResendOtp = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Phone number not found. Please try again.');
      navigation.goBack();
      return;
    }

    try {
      await sendOtp(phoneNumber);
      setCountdown(60);
      setCanResend(false);
      Alert.alert('Success', 'Verification code has been resent');
    } catch (error: any) {
      Alert.alert(
        'Error',
        'Failed to resend verification code. Please try again.',
      );
    }
  };

  const handleOtpVerify = async () => {
    if (value.length !== 6) {
      setIsOtpInvalid(true);
      return;
    }

    try {
      await confirmOtp(value);
      navigation.replace('User_Registration');
    } catch (error) {
      setIsOtpInvalid(true);
      Alert.alert('Error', 'Invalid verification code. Please try again.');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const formatPhoneNumber = (phone: string) => {
    // Format the phone number to show only last 4 digits
    const lastFourDigits = phone.slice(-4);
    return `+XXX-XXX-${lastFourDigits}`;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', top: 80, left: 20}}>
        <BackIcon />
      </TouchableOpacity>
      <View style={{width: '100%'}}>
        <View
          style={{
            padding: 20,
            alignSelf: 'center',
            backgroundColor: '#FFAF19',
            borderRadius: 50,
          }}>
          <Lock height={40} width={40} />
        </View>
        <View style={{marginTop: 10, alignSelf: 'center'}}>
          <Text
            style={{
              color: '#141921',
              fontFamily: 'DMSans36pt-ExtraBold',
              fontSize: 28,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            Enter verification code
          </Text>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text
              style={{
                color: '#141921',
                fontFamily: 'DMSans36pt-Medium',
                textAlign: 'center',
                fontSize: 16,
              }}>
              Input the code we sent to{' '}
              <Text style={{color: '#FFAF19', textDecorationLine: 'underline'}}>
                {formatPhoneNumber(phoneNumber)}
              </Text>{' '}
              to access your account.
            </Text>
          </View>
          <View style={{marginVertical: 10, alignSelf: 'center'}}>
            <Text
              style={{
                color: '#141921',
                fontSize: 18,
                fontFamily: 'DMSans36pt-SemiBold',
                alignSelf: 'center',
                marginBottom: 10,
              }}>
              Enter code Here
            </Text>
            <View style={{marginTop: 10, alignSelf: 'center', width: '80%'}}>
              <OtpInput
                numberOfDigits={6}
                textInputProps={{
                  accessibilityLabel: 'One-Time Password',
                }}
                theme={{
                  pinCodeContainerStyle: {
                    width: 45,
                    borderColor: isOtpInvalid ? '#ff0000' : '#ccc',
                    borderRadius: 5,
                  },
                  focusStickStyle: {
                    backgroundColor: '#FFAF19',
                  },
                  pinCodeTextStyle: {
                    color: '#333',
                  },
                  focusedPinCodeContainerStyle: {
                    borderColor: '#FFAF19',
                  },
                }}
                onTextChange={text => {
                  setValue(text);
                  setIsOtpInvalid(false);
                }}
              />
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity
                onPress={handleOtpVerify}
                style={{
                  height: 50,
                  backgroundColor: value.length === 6 ? '#FFAF19' : '#A8A8A8',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#141921',
                    fontSize: 18,
                    fontFamily: 'DMSans36pt-SemiBold',
                  }}>
                  Verify Now
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleResendOtp}
              disabled={!canResend}
              style={{
                marginTop: 15,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'DMSans36pt-Medium',
                  color: canResend ? '#F8AB1E' : '#141921',
                  textAlign: 'center',
                }}>
                Resend Code{' '}
                {!canResend && (
                  <Text style={{color: '#F8AB1E', fontWeight: '700'}}>
                    ({formatTime(countdown)})
                  </Text>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    borderColor: '#ccc',
  },

  underlineStyleHighLighted: {
    borderColor: '#9559D8',
  },

  underlineStyleError: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
    color: 'black',
  },
});
