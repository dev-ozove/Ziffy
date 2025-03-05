import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Lock from '../../../assets/login/Lock.svg';
import {OtpInput} from 'react-native-otp-entry';
import BackIcon from '../../../assets/Headers/Backicon.svg';
export default function Verify({navigation}: any) {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [isOtpInvalid, setIsOtpInvalid] = useState(false); // Track if OTP is invalid

  const handleOtpVerify = () => {
    navigation.push('User_Registration');
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
                +1-XXX-XXX-X258
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
                numberOfDigits={4}
                textInputProps={{
                  accessibilityLabel: 'One-Time Password',
                }}
                theme={{
                  pinCodeContainerStyle: {
                    width: 60,
                    borderColor: '#ccc',
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
                onTextChange={text => console.log(text)}
              />
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity
                onPress={handleOtpVerify}
                style={{
                  height: 50,
                  backgroundColor: '#A8A8A8',
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

            <Text
              style={{
                fontSize: 18,
                fontFamily: 'DMSans36pt-Medium',
                color: '#141921',
                textAlign: 'center',
                marginVertical: 15,
              }}>
              Resend Code{' '}
              <Text style={{color: '#F8AB1E', fontWeight: '700'}}>(2:26)</Text>
            </Text>
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
    borderColor: 'red', // Red border for invalid OTP
    color: 'black',
  },
});
