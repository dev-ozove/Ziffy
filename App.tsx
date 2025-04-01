// App.js
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/RootNavigator';
import {StatusBar, Text, View} from 'react-native';
import {OzoveProvider} from './src/Context/ozoveContext';
import {Provider, useDispatch} from 'react-redux';
import store from './src/Redux/Store/Store';
import {AuthContextProvider} from './src/Context/authContext';
import {clearUser, setUser} from './src/Redux/Features/UserSlice';
import {useAppSelector} from './src/hooks/useRedux';
import auth from '@react-native-firebase/auth';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {AlertProvider} from './src/Context/AlertContext';

export default function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const user = useAppSelector(state => state.user.user); // Live Redux state

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser: any) => {
      if (firebaseUser && firebaseUser.uid) {
        // Update Redux state when a user logs in
        dispatch(setUser(firebaseUser));
      } else {
        // Clear Redux state when no user is logged in
        dispatch(clearUser());
      }
      setIsLoading(false); // Set loading to false once auth state is determined
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [dispatch]);

  // Show loading spinner while auth state is being determined
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}></View>
    );
  }

  function NotchSafeStatusBar() {
    const insets = useSafeAreaInsets();

    return (
      <StatusBar
        backgroundColor="#FFAF19"
        barStyle="dark-content"
        translucent={true}
      />
    );
  }

  return (
    <AlertProvider>
      <SafeAreaProvider>
        <AuthContextProvider>
          <OzoveProvider>
            <StatusBar backgroundColor={'#FFAF19'} barStyle={'dark-content'} />
            <NavigationContainer>
              <NotchSafeStatusBar />
              <RootNavigator isSignedIn={!!user} />
            </NavigationContainer>
          </OzoveProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
