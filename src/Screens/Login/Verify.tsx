import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Lock from '../../../assests/login/Lock.svg';
import {OtpInput} from 'react-native-otp-entry';
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={{marginTop: 100, width: '100%'}}>
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
          <Text style={{color: '#333', fontWeight: 700, fontSize: 28}}>
            Enter verification code
          </Text>
          <View style={{width: '80%', alignSelf: 'center'}}>
            <Text style={{color: '#333', fontWeight: 500, textAlign: 'center'}}>
              Input the code we sent to{' '}
              <Text style={{color: '#FFAF19', textDecorationLine: 'underline'}}>
                +1-XXX-XXX-X258
              </Text>{' '}
              to access your account.
            </Text>
          </View>
          <View style={{marginTop: 10, alignSelf: 'center'}}>
            <Text
              style={{
                color: '#333',
                fontSize: 18,
                fontWeight: 600,
                alignSelf: 'center',
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
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#333', fontWeight: 400, fontSize: 16}}>
                  Verify Now
                </Text>
              </TouchableOpacity>
            </View>
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
