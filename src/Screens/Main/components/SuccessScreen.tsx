import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import CheckIcon from '../../../../assets/Success.svg'; // Use your existing icon

const SuccessScreen = ({navigation}: any) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);
    // Checkmark scaling animation
    animation.start(() => {
      navigation.replace('MainDrawer');
    });
  }, []);

  return (
    <View style={successStyles.container}>
      {/* Animated Checkmark */}
      <Animated.View
        style={[
          successStyles.checkContainer,
          {transform: [{scale: scaleAnim}]},
        ]}>
        <View style={successStyles.checkCircle}>
          <CheckIcon width={40} height={40} />
        </View>
      </Animated.View>

      {/* Fading Text Content */}
      <Animated.View style={[successStyles.textContainer, {opacity: fadeAnim}]}>
        <Text style={successStyles.successTitle}>Booking Confirmed!</Text>
        <Text style={successStyles.successText}>
          Your ride is successfully booked
        </Text>
      </Animated.View>
    </View>
  );
};

const successStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
  },
  checkContainer: {
    marginBottom: 30,
  },
  checkCircle: {
    backgroundColor: '#FFAF19',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  closeButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#FFAF19',
    borderRadius: 12,
  },
});

export default SuccessScreen;
