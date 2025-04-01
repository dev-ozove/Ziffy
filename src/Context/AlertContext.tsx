import React, {createContext, useContext, useState} from 'react';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Path, Svg} from 'react-native-svg';

type AlertType = 'success' | 'warning' | 'info' | 'error';
type AlertConfig = {
  type: AlertType;
  message: string;
  duration?: number;
};

type AlertContextType = {
  showAlert: (config: AlertConfig) => void;
  hideAlert: () => void;
};

const AlertContext = createContext<AlertContextType>({
  showAlert: () => {},
  hideAlert: () => {},
});

const AlertProvider = ({children}: {children: React.ReactNode}) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AlertType>('success');
  const offset = useSharedValue(-70); // Changed from -100 to -70
  const scale = useSharedValue(0.8);
  const progressWidth = useSharedValue(1);
  const [isVisible, setIsVisible] = useState(false);

  const alertStyle = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}, {scale: scale.value}],
    opacity: interpolate(offset.value, [-70, 0], [0, 1]), // Adjusted range
  }));
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
    opacity: interpolate(progressWidth.value, [0, 1], [0.8, 1]),
  }));

  const symbolStyle = useAnimatedStyle(() => ({
    transform: [{scale: withSpring(isVisible ? 1 : 0.5)}],
  }));

  const alertConfig = {
    success: {
      bg: ['#4CAF50', '#45a049'],
      symbol: (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M20 6L9 17L4 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
    },
    warning: {
      bg: ['#FFAF19', '#FF9800'],
      symbol: (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 9V12M12 16V17M3 16.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.07989 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.07989 21 7.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.07989 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
    },
    error: {
      bg: ['#ff4444', '#cc0000'],
      symbol: (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M18 6L6 18M6 6L18 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
    },
    info: {
      bg: ['#2196F3', '#1976D2'],
      symbol: (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
    },
  };

  const showAlert = ({type, message, duration = 3000}: AlertConfig) => {
    setType(type);
    setMessage(message);
    setIsVisible(true);

    // Reset animation values
    offset.value = -70;
    scale.value = 0.8;
    progressWidth.value = 1;

    // Start animations
    offset.value = withTiming(0, {
      duration: 400,
      easing: Easing.out(Easing.back(1)),
    });

    scale.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });

    progressWidth.value = withTiming(0, {
      duration,
      easing: Easing.linear,
    });

    setTimeout(() => {
      hideAlert();
    }, duration);
  };

  const hideAlert = () => {
    offset.value = withTiming(-100, {
      duration: 300,
      easing: Easing.in(Easing.ease),
    });
    scale.value = withTiming(0.8);
    progressWidth.value = 1;
    setIsVisible(false);
    setMessage('');
  };

  return (
    <AlertContext.Provider value={{showAlert, hideAlert}}>
      {children}
      {isVisible && (
        <View style={styles.alertWrapper}>
          <Animated.View
            style={[
              styles.alertContainer,
              alertStyle,
              {
                backgroundColor: alertConfig[type].bg[0],
                borderLeftColor: alertConfig[type].bg[1],
              },
            ]}>
            <View style={styles.contentContainer}>
              <Animated.View style={[styles.symbolContainer, symbolStyle]}>
                {alertConfig[type].symbol}
              </Animated.View>
              <Text style={styles.alertText}>{message}</Text>
            </View>
            <Animated.View style={[styles.progressBar, progressStyle]} />
          </Animated.View>
        </View>
      )}
    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  alertWrapper: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1000,
  },

  alertContainer: {
    padding: 10,
    borderLeftWidth: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  symbolContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
  },
  alertText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    flex: 1,
    lineHeight: 20,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderBottomLeftRadius: 8,
  },

  symbol: {},
});

const useAlert = () => useContext(AlertContext);

export {AlertProvider, useAlert};
