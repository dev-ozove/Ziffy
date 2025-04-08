import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Lock from '../../../assets/login/Lock.svg';
import {OtpInput} from 'react-native-otp-entry';
import BackIcon from '../../../assets/Headers/Backicon.svg';
import {useAuth} from '../../Context/authContext';
import {useAlert} from '../../Context/AlertContext';

export default function Verify({navigation, route}: any) {
  const [value, setValue] = useState('');
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const {confirmOtp, isOtpSent, sendOtp} = useAuth();
  const {showAlert} = useAlert();
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
      showAlert({
        type: 'error',
        message: 'Phone number not found. Please try again.',
      });
      navigation.goBack();
      return;
    }

    try {
      await sendOtp(phoneNumber);
      setCountdown(60);
      setCanResend(false);
      showAlert({
        type: 'success',
        message: 'Verification code has been resent',
      });
    } catch (error: any) {
      showAlert({
        type: 'error',
        message: 'Failed to resend verification code. Please try again.',
      });
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
      showAlert({
        type: 'error',
        message: 'Invalid verification code. Please try again.',
      });
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
        <View style={{width: '100%', alignItems: 'center'}}>
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
        </View>

        <View style={{width: '100%', paddingHorizontal: 16, marginTop: 20}}>
          <TouchableOpacity
            onPress={handleOtpVerify}
            style={{
              height: 55,
              backgroundColor: value.length === 6 ? '#FFAF19' : '#E5E5E5',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
              width: '100%',
            }}>
            <Text
              style={{
                color: value.length === 6 ? '#141921' : '#8E8E93',
                fontSize: 18,
                fontFamily: 'DMSans36pt-Bold',
                letterSpacing: 0.5,
              }}>
              Verify Now
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleResendOtp}
          disabled={!canResend}
          style={{
            marginTop: 20,
            alignItems: 'center',
            paddingVertical: 5,
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
