import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Profile_Icon from '../../../assets/Profile_Icon.svg';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import InputField from '../../Components/InputField';
import BackIcon from '../../../assets/Headers/Backicon.svg';

import axios from 'axios';
import BackendConstants from '../../Config/Config';
export default function UserRegistration({navigation}: any) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, set_email] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setErrorMessage(''); // Clear any previous error messages

    const formData = {
      Firstname: firstName,
      Lastname: lastName,
      email: email,
      Date_of_birth: dateOfBirth,
    };

    try {
      const url = `${BackendConstants.Url}/register`;
      console.log('API URL:', url); // Log URL for debugging
      console.log('Sending Data:', formData);

      await axios
        .post(url, formData)
        .then(e => {
          console.log(e?.data);
          if (e?.data) {
            if (e?.data?.status == 400) {
              Alert.alert('Registration Failed', 'Email Already Taken');
            } else if (e?.data?.status == 200) {
              navigation.push('Main');
              Alert.alert(
                'User Added Successfully',
                'User Registarion completed',
              );
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error: any) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        console.log('Server Error:', error.response.data);
        setErrorMessage(
          `Server Error: ${
            error.response.data.message || 'Something went wrong'
          }`,
        );
      } else if (error.request) {
        // Request was made but no response was received
        console.log(error.request);
        console.log('Network Error: No response received');
        setErrorMessage(
          'Network Error: Please check your internet connection and try again.',
        );
      } else {
        // Other errors
        console.log('Error:', error.message);
        setErrorMessage(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
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
      <View
        style={{
          marginTop: 110,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#141921',
            fontFamily: 'DMSans36pt-ExtraBold',
            fontSize: 28,
          }}>
          Account Info
        </Text>
        <View style={{width: '60%', marginTop: 5}}>
          <Text
            style={{
              color: '#333333',
              fontFamily: 'DMSans36pt-Medium',
              fontSize: 16,
            }}>
            Please enter your email & name so our drivers can confirm your ride.
          </Text>
        </View>
      </View>

      {/* Image Upload Button */}
      <View
        style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFAF1925',
              borderRadius: 100,
            }}>
            <Profile_Icon />
          </View>
          <Text
            style={{
              marginTop: 10,
              color: '#767676',
              fontFamily: 'DMSans36pt-Medium',
              fontSize: 14,
            }}>
            Upload Image
          </Text>
        </TouchableOpacity>
      </View>

      {/*User Details form*/}
      <View style={{flex: 1, width: '100%'}}>
        <View style={{flex: 1, margin: 20}}>
          <InputField
            label="First name"
            labelstyle={{
              fontSize: 18,
              color: '#333333',
              fontFamily: 'DMSans36pt-SemiBold',
            }}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <InputField
            label="Last name"
            labelstyle={{
              fontSize: 18,
              color: '#333333',
              fontFamily: 'DMSans36pt-SemiBold',
            }}
            placeholder="Enter your Last name"
            value={lastName}
            onChangeText={setLastName}
          />
          <InputField
            label="Your email address"
            labelstyle={{
              fontSize: 18,
              color: '#333333',
              fontFamily: 'DMSans36pt-SemiBold',
            }}
            placeholder="Enter your Last name"
            value={email}
            onChangeText={set_email}
          />
          <Text
            style={{
              color: '#767676',
              fontFamily: 'DMSans36pt-Medium',
              fontSize: 15,
            }}>
            We will send your reports to this email address
          </Text>

          <InputField
            label="Date of Birth"
            labelstyle={{
              fontSize: 18,
              color: '#333333',
              fontFamily: 'DMSans36pt-SemiBold',
            }}
            placeholder="Enter date of birth"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            isDate={true} // Enable date picker for this field
          />

          <TouchableOpacity
            onPress={handleSave}
            style={{
              height: 50,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              backgroundColor: '#FFAF19',
            }}>
            {loading ? (
              <ActivityIndicator size={'large'} color={'#333'} />
            ) : (
              <Text
                style={{
                  color: '#333333',
                  fontSize: 20,
                  fontFamily: 'DMSans36pt-SemiBold',
                }}>
                Done
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    </View>
  );
}
