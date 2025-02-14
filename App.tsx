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

  return (
    <AuthContextProvider>
      <OzoveProvider>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        <NavigationContainer>
          {/* Pass Redux state directly to RootNavigator */}
          <RootNavigator isSignedIn={!!user} />
        </NavigationContainer>
      </OzoveProvider>
    </AuthContextProvider>
  );
}
