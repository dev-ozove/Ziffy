import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Profile_Icon from '../../../assets/Profile_Icon.svg';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import InputField from '../../Components/InputField';
import BackIcon from '../../../assets/Headers/Backicon.svg';
import {useAuth} from '../../Context/authContext';
import axios from 'axios';
import BackendConstants from '../../Config/Config';
import LoaderZiffy from '../Main/components/Loader/LoaderZiffy';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');

export default function UserRegistration({navigation}: any) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {sendOtp, confirmOtp, isOtpSent} = useAuth();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Get the current user from Firebase Auth
    const checkAuthState = async () => {
      try {
        const user = auth().currentUser;
        console.log('Current Firebase user:', user ? user.uid : 'No user');

        if (user) {
          setCurrentUser(user);
          // Pre-fill email if available
          if (user.email) {
            setEmail(user.email);
          }
        } else {
          console.error('No authenticated user found');
          // If no user is logged in, go back to login
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        navigation.replace('Login');
      }
    };

    checkAuthState();
  }, []);

  const validateForm = () => {
    if (!firstName.trim()) {
      Alert.alert('Error', 'Please enter your first name');
      return false;
    }
    if (!lastName.trim()) {
      Alert.alert('Error', 'Please enter your last name');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (!dateOfBirth.trim()) {
      Alert.alert('Error', 'Please enter your date of birth');
      return false;
    }
    return true;
  };

  const updateFirebaseUser = async () => {
    if (!currentUser) {
      console.error('No current user found');
      return false;
    }

    try {
      console.log('Updating Firebase user profile...');

      // Save user data to Firestore first (this doesn't require reauthentication)
      try {
        await firestore().collection('Users').doc(currentUser.uid).set(
          {
            firstName,
            lastName,
            email,
            dateOfBirth,
            phoneNumber: currentUser.phoneNumber,
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          {merge: true},
        );
        console.log('User data saved to Firestore successfully');
      } catch (firestoreError) {
        console.error('Error saving to Firestore:', firestoreError);
        // Continue with other operations even if Firestore update fails
      }

      // Try to update the user's display name
      try {
        await currentUser.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });
        console.log('Display name updated successfully');
      } catch (profileError) {
        console.error('Error updating display name:', profileError);
        // Continue with other updates even if display name update fails
      }

      // Try to update the user's email if it's different
      if (currentUser.email !== email) {
        try {
          await currentUser.updateEmail(email);
          console.log('Email updated successfully');
        } catch (emailError) {
          console.error('Error updating email:', emailError);
          // Continue with other updates even if email update fails
        }
      }

      // If we got here, at least one operation succeeded
      return true;
    } catch (error) {
      console.error('Error updating Firebase user:', error);
      return false;
    }
  };

  const checkBackendAvailability = async () => {
    try {
      console.log('Checking backend availability...');
      const response = await axios.get(`${BackendConstants.Url}/health`, {
        timeout: 5000, // Short timeout for health check
      });
      console.log('Backend health check response:', response.data);
      return true;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage('');

    try {
      console.log('Starting user registration process...');

      // First update Firebase user
      console.log('Updating Firebase user...');
      const firebaseUpdated = await updateFirebaseUser();

      if (!firebaseUpdated) {
        console.warn(
          'Firebase update failed, but continuing with backend registration',
        );
        // We'll continue with backend registration even if Firebase update fails
      } else {
        console.log('Firebase user updated successfully');
      }

      // Check if backend is available
      const isBackendAvailable = await checkBackendAvailability();
      if (!isBackendAvailable) {
        console.warn('Backend is not available, proceeding to MainDrawer');
        Alert.alert(
          'Backend Unavailable',
          'The server is currently unavailable. You can still use the app, but some features may be limited.',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('MainDrawer'),
            },
          ],
        );
        return;
      }

      // Then register with backend
      console.log('Registering with backend...');
      const formData = {
        Firstname: firstName,
        Lastname: lastName,
        email: email,
        Date_of_birth: dateOfBirth,
        uid: currentUser?.uid,
      };

      const url = `${BackendConstants.Url}/register`;
      console.log('API URL:', url);
      console.log('Sending Data:', formData);

      try {
        // Set up axios with timeout
        const axiosInstance = axios.create({
          timeout: BackendConstants.Timeout,
        });

        const response = await axiosInstance.post(url, formData);
        console.log('Response:', response.data);

        if (response.data?.status === 400) {
          Alert.alert('Registration Failed', 'Email Already Taken');
        } else if (response.data?.status === 200) {
          Alert.alert('Success', 'User Registration completed', [
            {
              text: 'OK',
              onPress: () => navigation.replace('MainDrawer'),
            },
          ]);
        }
      } catch (apiError: any) {
        console.error('API Error:', apiError);

        // Handle 500 server error specifically
        if (apiError.response && apiError.response.status === 500) {
          console.error('Server Error Details:', apiError.response.data);

          // Check if we have more details in the error response
          const errorMessage =
            apiError.response.data?.message ||
            apiError.response.data?.error ||
            'Server error occurred. Please try again later.';

          setErrorMessage(`Server Error (500): ${errorMessage}`);

          // Try with fallback URL if available
          if (
            BackendConstants.FallbackUrl &&
            BackendConstants.FallbackUrl !== BackendConstants.Url
          ) {
            console.log('Trying with fallback URL...');
            try {
              const fallbackUrl = `${BackendConstants.FallbackUrl}/register`;
              const fallbackResponse = await axios.post(fallbackUrl, formData, {
                timeout: BackendConstants.Timeout,
              });

              if (fallbackResponse.data?.status === 200) {
                Alert.alert('Success', 'User Registration completed', [
                  {
                    text: 'OK',
                    onPress: () => navigation.replace('MainDrawer'),
                  },
                ]);
                return; // Exit the function if successful
              }
            } catch (fallbackError) {
              console.error('Fallback URL also failed:', fallbackError);
            }
          }

          // Show a more helpful error message to the user
          Alert.alert(
            'Server Error',
            'There was a problem with the server. Please try again later or contact support if the problem persists.',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Continue to MainDrawer even with server error
                  // This allows the user to proceed with the app
                  navigation.replace('MainDrawer');
                },
              },
            ],
          );
        } else {
          // Handle other API errors
          if (apiError.response) {
            setErrorMessage(
              `Server Error: ${
                apiError.response.data?.message || 'Something went wrong'
              }`,
            );
          } else if (apiError.request) {
            setErrorMessage(
              'Network Error: Please check your internet connection and try again.',
            );
          } else {
            setErrorMessage(`Error: ${apiError.message}`);
          }

          Alert.alert(
            'Registration Failed',
            errorMessage || 'Something went wrong',
          );
        }
      }
    } catch (error: any) {
      console.error('Registration Error:', error);

      // Provide more specific error messages based on the error type
      if (error.message.includes('Firebase')) {
        setErrorMessage(`Firebase Error: ${error.message}`);
      } else if (error.response) {
        setErrorMessage(
          `Server Error: ${
            error.response.data?.message || 'Something went wrong'
          }`,
        );
      } else if (error.request) {
        setErrorMessage(
          'Network Error: Please check your internet connection and try again.',
        );
      } else {
        setErrorMessage(`Error: ${error.message}`);
      }

      Alert.alert(
        'Registration Failed',
        errorMessage || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: hp('5%'),
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              top: hp('10%'),
              left: wp('5%'),
              zIndex: 1,
            }}>
            <BackIcon />
          </TouchableOpacity>

          <View
            style={{
              marginTop: hp('15%'),
              alignItems: 'center',
              paddingHorizontal: wp('5%'),
            }}>
            <Text
              style={{
                color: '#141921',
                fontFamily: 'DMSans36pt-ExtraBold',
                fontSize: wp('7%'),
                textAlign: 'center',
              }}>
              Account Info
            </Text>
            <Text
              style={{
                color: '#333333',
                fontFamily: 'DMSans36pt-Medium',
                fontSize: wp('4%'),
                textAlign: 'center',
                marginTop: hp('1%'),
                width: wp('80%'),
              }}>
              Please enter your email & name so our drivers can confirm your
              ride.
            </Text>
          </View>

          {/* Profile Image Upload */}
          <View
            style={{
              marginTop: hp('3%'),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: wp('25%'),
                  height: wp('25%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FFAF1925',
                  borderRadius: wp('12.5%'),
                }}>
                <Profile_Icon width={wp('15%')} height={wp('15%')} />
              </View>
              <Text
                style={{
                  marginTop: hp('1%'),
                  color: '#767676',
                  fontFamily: 'DMSans36pt-Medium',
                  fontSize: wp('3.5%'),
                }}>
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: wp('5%'),
              marginTop: hp('3%'),
            }}>
            <InputField
              label="First name"
              labelstyle={{
                fontSize: wp('4.5%'),
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
                fontSize: wp('4.5%'),
                color: '#333333',
                fontFamily: 'DMSans36pt-SemiBold',
              }}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
            />
            <InputField
              label="Your email address"
              labelstyle={{
                fontSize: wp('4.5%'),
                color: '#333333',
                fontFamily: 'DMSans36pt-SemiBold',
              }}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Text
              style={{
                color: '#767676',
                fontFamily: 'DMSans36pt-Medium',
                fontSize: wp('3.5%'),
                marginTop: hp('0.5%'),
                marginBottom: hp('1%'),
              }}>
              We will send your reports to this email address
            </Text>

            <InputField
              label="Date of Birth"
              labelstyle={{
                fontSize: wp('4.5%'),
                color: '#333333',
                fontFamily: 'DMSans36pt-SemiBold',
              }}
              placeholder="Enter date of birth"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              isDate={true}
            />

            <TouchableOpacity
              onPress={handleSave}
              disabled={loading}
              style={{
                height: hp('6%'),
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp('3%'),
                backgroundColor: loading ? '#A8A8A8' : '#FFAF19',
              }}>
              {loading ? (
                <LoaderZiffy />
              ) : (
                <Text
                  style={{
                    color: '#333333',
                    fontSize: wp('5%'),
                    fontFamily: 'DMSans36pt-SemiBold',
                  }}>
                  Done
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
