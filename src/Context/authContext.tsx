import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { clearBookings, setBookings } from '../Redux/Features/BookingsSlice';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { clearUser, setUser } from '../Redux/Features/UserSlice';
import axios from 'axios';
import BackendConstants from '../Config/Config';
import { useAppSelector } from '../hooks/useRedux';
import { Platform } from 'react-native';

interface AuthContextType {
  // Existing properties
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  check_for_user: (
    email: string | null,
  ) => Promise<
    { email?: string; userType?: string; deviceDetails?: any } | undefined
  >;
  userType: string;
  userDeviceTheme: any;
  // New phone auth functions
  sendOtp: (phoneNumber: string) => Promise<void>;
  confirmOtp: (code: string) => Promise<void>;
  isOtpSent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface OzoveProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<OzoveProviderProps> = ({
  children,
}) => {
  const [ServerLoading, setLoading] = useState(false);
  const [userType, set_userType] = useState('');
  const [userDeviceTheme, set_userDeviceTheme] = useState<any>(null);
  const user = useAppSelector(state => state.user.user); // Live Redux state
  const dispatch = useDispatch();
  const [confirmation, setConfirmation] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Updated check_for_user returns a Promise with user details if exists.
  const check_for_user = (
    email: string | null,
  ): Promise<
    { email?: string; userType?: string; deviceDetails?: any } | undefined
  > => {
    return new Promise((resolve, reject) => {
      if (!email) {
        resolve(undefined);
        return;
      }
      const docRef = firestore()
        .collection('Users')
        .doc('Zenmode')
        .collection('emails')
        .doc(email);

      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();
            console.log('Document data:', data);
            if (data?.email !== '') {
              set_userType('zenmode');
              set_userDeviceTheme(data?.deviceDetails);
              resolve({
                email: data?.email,
                userType: 'zenmode',
                deviceDetails: data?.deviceDetails,
              });
              return;
            }
          } else {
            console.log('No such document!');
            // If no document, assume customer (or driver) user type.
            set_userType('customer');
            resolve({ userType: 'customer' });
            return;
          }
          resolve(undefined);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  // Update user details on mount when user.userType is undefined
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && user.userType === undefined) {
        try {
          const userDetails = await check_for_user(user.email);
          console.log('User details loaded', userDetails);
          const user_info = {
            ...user,
            userType: userType,
            deviceDetails: userDeviceTheme,
          };
          dispatch(setUser(user_info));
        } catch (error) {
          console.error('Error checking user:', error);
        }
      }
    };

    fetchUserDetails();
  }, [user, dispatch, userType, userDeviceTheme]);

  useEffect(() => {
    // Configure Google Sign-in
    console.log('Configuring Google Sign-in...');
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId:
        Platform.OS == "android" ?
          '127159368329-5r68a6lto3ukpmapnmn8tpmqcr0d6h7l.apps.googleusercontent.com' :
          '127159368329-q9qde6uvp2ft0tiks11p24q6hi8nhhlh.apps.googleusercontent.com'

    });
  }, []);

  const register_backend = async ({ userInfo }: { userInfo: any }) => {
    try {
      const response = await axios.post(`${BackendConstants.Url}/register`, {
        name: userInfo?.user?.displayName,
        email: userInfo?.user?.email,
        uid: userInfo?.user?.uid,
      });
      const data = response.data;
      console.log('data from backend >>', data);
      dispatch(setUser(userInfo));
    } catch (error) {
      console.log(error);
    }
  };

  const sendOtp = async (phoneNumber: string) => {
    try {
      const confirmationResult = await auth().signInWithPhoneNumber(
        phoneNumber,
      );
      setConfirmation(confirmationResult);
      setIsOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setIsOtpSent(false);
      throw error;
    }
  };

  const confirmOtp = async (code: string) => {
    if (!confirmation) {
      throw new Error('No confirmation available');
    }
    try {
      await confirmation.confirm(code);
      setIsOtpSent(false);
    } catch (error) {
      console.error('Error confirming OTP:', error);
      throw error;
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const { data } = await GoogleSignin.signIn();
      if (data?.idToken) {
        const credential = auth.GoogleAuthProvider.credential(data.idToken);

        await auth()
          .signInWithCredential(credential)
          .then(async userInfo => {
            try {
              // Wait for check_for_user and merge its result into the user info
              const details = await check_for_user(userInfo?.user?.email);
              const finalUserInfo = {
                ...userInfo,
                userType: details?.userType || userType,
                deviceDetails: details?.deviceDetails || userDeviceTheme,
              };
              register_backend({ userInfo: finalUserInfo });
            } catch (error) {
              console.log(error);
            }
          });
      } else {
        console.log('Google Sign-in not working');
      }
    } catch (error) {
      console.log(error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log(error);
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log(error);
            break;
          default:
            break;
        }
      } else {
        console.log(error);
      }
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      // Sign out from Google
      await GoogleSignin.signOut();
      await auth()
        .signOut()
        .then(() => {
          dispatch(setUser(null));
          dispatch(setBookings([]));
          console.log('Successfully signed out.');
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  const values = {
    signInWithGoogle,
    signOut,
    check_for_user,
    userType,
    userDeviceTheme,
    sendOtp,
    confirmOtp,
    isOtpSent,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
