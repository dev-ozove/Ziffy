// src/screens/SplashScreen.js
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StatusBar,
  Animated,
  Dimensions,
  AppState,
  Easing,
} from 'react-native';
import Logo from '../../../assets/logo.svg';
import {useAppSelector} from '../../hooks/useRedux';
import {CommonActions} from '@react-navigation/native';

const SplashScreen = ({navigation, isSignedIn}: any) => {
  const screenHeight = Dimensions.get('window').height;
  const finalScale = Math.min(screenHeight / 100, 15);
  const user = useAppSelector(state => state.user.user);
  const appState = useRef(AppState.currentState);

  // Animation control
  const progress = useRef(new Animated.Value(0)).current;
  const [statusBarColor, setStatusBarColor] = useState('white');

  // Interpolated animations
  const animatedStyles = {
    transform: [
      {
        scale: progress.interpolate({
          inputRange: [0, 0.2, 0.4, 1],
          outputRange: [0.6, 0.8, 0.7, finalScale], // Bounce effect
          extrapolate: 'clamp',
        }),
      },
      {
        translateY: progress.interpolate({
          inputRange: [0, 0.2, 0.4, 1],
          outputRange: [0, -30, 0, 0], // Bounce movement
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: progress.interpolate({
      inputRange: [0, 0.1, 0.2, 1],
      outputRange: [0, 1, 1, 1],
    }),
  };

  const handleAppStateChange = (nextAppState: any) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      resetAnimations();
      startAnimations();
    }
    appState.current = nextAppState;
  };

  const resetAnimations = () => {
    progress.setValue(0);
    setStatusBarColor('white');
  };

  const startAnimations = () => {
    Animated.sequence([
      // Initial bounce animation
      Animated.parallel([
        Animated.spring(progress, {
          toValue: 0.4,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0.4,
          duration: 800,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        }),
      ]),
      // Pause at medium size
      Animated.delay(500),
      // Fast zoom animation
      Animated.timing(progress, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStatusBarColor('#FFAF19');
      setTimeout(() => navigateToApp(), 150);
    });
  };

  const navigateToApp = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: getTargetRoute(),
            params: {fromSplash: true},
          },
        ],
      }),
    );
  };

  const getTargetRoute = () => {
    if (user?.userType === 'customer')
      return isSignedIn ? 'MainDrawer' : 'Login';
    if (user?.userType === 'zenmode')
      return isSignedIn ? 'Zenmode_MainDrawer' : 'Login';
    return isSignedIn ? 'MainDrawer' : 'Login';
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    startAnimations();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: statusBarColor}}>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={statusBarColor === 'white' ? 'dark-content' : 'light-content'}
      />

      <Animated.View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedStyles,
        ]}>
        <Logo
          width={200}
          height={200}
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
