import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Circle, G, Line, Path} from 'react-native-svg';
import {Easing} from 'react-native-reanimated';
const LoaderZiffy = () => {
  // Animation values
  const rotation = useSharedValue(0); // Rotation angle in degrees
  const scale = useSharedValue(1); // Scale factor for pulsing
  const [dots, setDots] = useState(0); // Number of dots for "Loading..." text

  // Start animations and dot interval on mount
  useEffect(() => {
    // Rotation: 0 to 360 degrees over 3 seconds, repeating indefinitely
    rotation.value = withRepeat(
      withTiming(360, {duration: 3000, easing: Easing.linear}),
      -1, // Infinite repeats
      false, // Do not reverse
    );

    // Scale: 1 to 1.1 and back over 1 second, repeating indefinitely
    scale.value = withRepeat(
      withTiming(1.1, {duration: 1000, easing: Easing.inOut(Easing.ease)}),
      -1, // Infinite repeats
      true, // Reverse to create pulsing effect
    );

    // Update dots every 1 second (0 to 3, then repeat)
    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Define animated style with rotation and scale
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}, {scale: scale.value}],
    };
  });

  return (
    <View style={styles.container}>
      {/* Animated steering wheel */}
      <Animated.View style={animatedStyle}>
        <Svg width={100} height={100} viewBox="0 0 502 502">
          <G>
            <G>
              <Path
                fill="#4D4D4D"
                d="M251 10C117.899 10 10 117.899 10 251s107.899 241 241 241 241-107.899 241-241S384.101 10 251 10zm0 431c-104.934 0-190-85.066-190-190S146.066 61 251 61s190 85.066 190 190-85.066 190-190 190z"
              />
              <Circle cx={251} cy={251} r={190} fill="#FFAF19" />
              <Path
                fill="#CCCCCC"
                d="M251 61C146.066 61 61 146.066 61 251s85.066 190 190 190 190-85.066 190-190S355.934 61 251 61zm156 190c0 22.176-4.637 43.265-12.979 62.366l-90.951-52.51C303.672 257.661 304 254.37 304 251c0-23.137-14.831-42.799-35.5-50.029V95.983C346.417 104.682 407 170.761 407 251zm-173.5-155.017v104.989C212.831 208.201 198 227.863 198 251c0 3.37.328 6.661.929 9.856l-90.951 52.51C99.637 294.265 95 273.176 95 251c0-80.239 60.583-146.318 138.5-155.017zM251 407c-51.454 0-97.084-24.916-125.499-63.336l90.937-52.503C225.719 299.156 237.79 304 251 304s25.281-4.844 34.562-12.838l90.937 52.503C348.084 382.084 302.454 407 251 407z"
              />
            </G>
            <G>
              <Path
                fill="#000"
                d="M428.483 73.516C381.076 26.108 318.045 0 251 0 183.956 0 120.924 26.108 73.516 73.516S0 183.956 0 251s26.108 130.076 73.516 177.484S183.956 502 251 502c67.045 0 130.076-26.108 177.483-73.516C475.892 381.076 502 318.044 502 251S475.892 120.924 428.483 73.516zM251 482C123.626 482 20 378.374 20 251S123.626 20 251 20s231 103.626 231 231-103.626 231-231 231z"
              />
              <Path
                fill="#000"
                d="M381.499 335.004l-90.937-52.502c-3.682-2.126-8.306-1.692-11.526 1.083C271.238 290.301 261.281 294 251 294c-10.282 0-20.238-3.699-28.036-10.415-3.221-2.774-7.845-3.21-11.526-1.083l-90.937 52.502c-2.467 1.424-4.209 3.833-4.79 6.623s.056 5.693 1.75 7.984c15.119 20.442 35.025 37.393 57.566 49.017C198.334 410.647 224.605 417 251 417s52.666-6.353 75.973-18.373c22.541-11.625 42.447-28.575 57.566-49.017 1.694-2.291 2.331-5.195 1.75-7.984s-2.323-5.199-4.79-6.623zM251 397c-42.333 0-82.823-18.692-110.417-50.497l75.09-43.353C226.055 310.187 238.359 314 251 314s24.945-3.813 35.326-10.85l75.09 43.353C333.823 378.308 293.333 397 251 397z"
              />
              <Path
                fill="#000"
                d="M208.757 259.007c-.502-2.669-.757-5.363-.757-8.007 0-18.252 11.575-34.563 28.802-40.59 4.012-1.403 6.698-5.189 6.698-9.439V95.982c0-2.845-1.212-5.556-3.333-7.453-2.121-1.897-4.95-2.798-7.777-2.485C148.364 95.426 85 166.342 85 251c0 23.047 4.648 45.377 13.814 66.368 1.139 2.608 3.336 4.608 6.04 5.498 1.019.335 2.073.5 3.124.5 1.737 0 3.464-.453 5-1.34l90.951-52.51c3.678-2.123 5.613-6.336 4.827-10.509zM113.042 298.896C107.701 283.549 105 267.486 105 251c0-70.678 50.206-130.464 118.5-143.41v86.727C202.004 204.748 188 226.701 188 251c0 1.501.056 3.011.166 4.523l-75.124 43.373z"
              />
              <Path
                fill="#000"
                d="M269.609 86.044c-2.829-.313-5.656.589-7.776 2.485-2.121 1.897-3.333 4.608-3.333 7.453v104.989c0 4.25 2.687 8.036 6.698 9.439C282.426 216.437 294 232.748 294 251c0 2.645-.255 5.338-.757 8.005-.786 4.173 1.149 8.388 4.827 10.511l90.951 52.51c1.536.887 3.263 1.34 5 1.34 1.051 0 2.105-.166 3.124-.5 2.704-.889 4.901-2.889 6.04-5.498C412.353 296.378 417 274.049 417 251c0-84.658-63.364-155.574-147.391-164.956zM388.959 298.896l-75.125-43.373c.11-1.512.166-3.022.166-4.523 0-24.299-14.005-46.252-35.5-56.683V107.59C346.794 120.536 397 180.322 397 251c0 16.486-2.701 32.55-8.041 47.896z"
              />
              <Path
                fill="#000"
                d="M251 51C140.72 51 51 140.72 51 251s89.72 200 200 200 200-89.72 200-200S361.28 51 251 51zm0 380c-99.252 0-180-80.748-180-180S151.748 71 251 71c99.252 0 180 80.748 180 180s-80.748 180-180 180z"
              />
              <Path
                fill="#000"
                d="M336.427 163.333c-4.163 3.629-4.596 9.946-.967 14.109C353.22 197.814 363 223.938 363 251c0 5.523 4.478 10 10 10s10-4.477 10-10c0-31.895-11.529-62.686-32.464-86.701-3.629-4.163-9.946-4.596-14.109-.967z"
              />
              <Path
                fill="#000"
                d="M322.416 139.97c-4.849-3.124-9.943-5.952-15.144-8.406-4.996-2.358-10.954-.219-13.312 4.776-2.356 4.995-.219 10.954 4.776 13.311 4.41 2.082 8.732 4.48 12.847 7.131 1.675 1.08 3.552 1.595 5.406 1.595 3.286 0 6.504-1.618 8.416-4.585 2.039-3.217 1.7-7.405-1.943-10.396z"
              />
            </G>
          </G>
        </Svg>
      </Animated.View>

      {/* Loading text with animated dots */}
      {/* <Text style={styles.text}>Loading{'.'.repeat(dots)}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Dark background
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#FFAF19', // Theme color
  },
});

export default LoaderZiffy;
