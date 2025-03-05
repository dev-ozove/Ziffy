import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  BackHandler,
  Text,
  Button,
  Image,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {useAppSelector, useAppDispatch} from '../../hooks/useRedux';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';
import PostRideDetails from './components/PostRideDetails';
import DriverDetails from './components/DriverDetails';
import CancelModal from './components/CancelModal';
import {clearBookings} from '../../Redux/Features/BookingsSlice';
import StartRideComponent from './components/StartRideComponent';
import ArrivingComponent from './components/ArrivingComponent';
import ReviewComponent from './components/ReviewComponent';

const {height} = Dimensions.get('window');

const BookingStatus = ({route}: any) => {
  const {source} = route.params || {};

  console.log('source', source);
  const dispatch = useAppDispatch();
  const bookings = useAppSelector(state => state.bookings.bookings);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  const [showPostRide, setShowPostRide] = useState(true);
  const [showStartRide, setShowStartRide] = useState(false);
  const [showReview, setReview] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const location = {
    latitude: -31.9523,
    longitude: 115.8613,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const initialLocation = {
    latitude: -31.9523,
    longitude: 115.8613,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const carLocation = {
    latitude: -31.9307925,
    longitude: 115.8561585,
  };

  const southPerthLocation = {
    latitude: -31.9402676,
    longitude: 115.8607531,
  };

  const [carArrived, setCarArrived] = useState(false);
  const [carPosition, setCarPosition] = useState(carLocation);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showStartRide) {
      const timer = setTimeout(() => {
        setCarPosition(southPerthLocation);
        setCarArrived(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showStartRide]);

  useEffect(() => {
    if (carArrived && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...southPerthLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000,
      );
    }
  }, [carArrived]);

  useEffect(() => {
    if (showStartRide && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...southPerthLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000,
      );
    }
  }, [showStartRide]);

  useEffect(() => {
    if (carArrived) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [carArrived]);

  const snapPoints = useMemo(() => {
    if (showStartRide) {
      return ['30%'];
    }
    return showPostRide ? ['70%', '30%'] : ['60%', '30%', '5%'];
  }, [showPostRide, showStartRide]);

  useEffect(() => {
    if (showStartRide) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [showStartRide]);

  const handleTrackRide = () => {
    console.log('Track Ride Pressed!');
    setShowPostRide(false);
  };

  const handleCancelRide = () => {
    setModalVisible(true);
  };

  const handleBackPress = () => {
    setReview(false);
    setShowStartRide(true);
  };

  const handleReviewPress = () => {
    setReview(false);
    setShowStartRide(false);
    setShowPostRide(true);
    setCarArrived(false);
    setCarPosition(carLocation);
    setShowPopup(false);
    navigation.navigate('Main');
  };

  const handleReview = () => {
    setReview(true);
    console.log('pressed Review');
  };

  const handleCheckin = () => {
    navigation.navigate('QRScanner', {source: 'BookingStatus'});
    setShowPostRide(false);
  };

  const handleBackAction = () => {
    if (!showPostRide) {
      setShowPostRide(true);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackAction,
    );
    return () => backHandler.remove();
  }, [showPostRide]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          key={showStartRide}
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          initialRegion={initialLocation}>
          {showStartRide && (
            <Marker coordinate={carPosition}>
              <Image
                source={require('../../../assets/DriverProfile/Car.png')}
                style={{width: 60, height: 60, resizeMode: 'contain'}}
              />
            </Marker>
          )}
          {showStartRide && !carArrived && (
            <Polyline
              coordinates={[carLocation, southPerthLocation]}
              strokeWidth={8}
              strokeColor="orange"
            />
          )}
          {showStartRide && (
            <Marker coordinate={southPerthLocation} pinColor="orange" />
          )}
        </MapView>
      </View>

      <View style={styles.profileButton}>
        <Header navigation={navigation} />
      </View>

      {showPopup && (
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>Trip Complete</Text>
          </View>
        </View>
      )}

      <CancelModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          console.log('Ride Canceled');
          dispatch(clearBookings());
          setModalVisible(false);
          navigation.navigate('Main');
        }}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={true}
        enableOverDrag={false}
        handleComponent={showPostRide ? null : undefined}>
        <BottomSheetView style={styles.contentContainer}>
          <BottomSheetScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{paddingBottom: 20}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {showReview ? (
              <ReviewComponent
                backpress={handleBackPress}
                ReviewPress={handleReviewPress}
              />
            ) : showStartRide ? (
              <ArrivingComponent
                carArrived={carArrived}
                onReviewPress={handleReview}
              />
            ) : source === 'Checkin' ? (
              <StartRideComponent
                onProceed={() => {
                  setShowStartRide(true);
                  navigation.navigate('BookingStatus');
                }}
              />
            ) : showPostRide ? (
              <PostRideDetails
                onTrackRidePress={handleTrackRide}
                onCancelRidePress={handleCancelRide}
              />
            ) : (
              <DriverDetails onCheckinPress={handleCheckin} />
            )}
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    maxHeight: height * 0.8,
  },
  profileButton: {
    position: 'absolute',
    top: 60,
    left: 10,
    flexDirection: 'row',
    gap: 10,
  },
  popupContainer: {
    position: 'absolute',
    width: '80%',
    top: '25%',
    left: '30%',
    transform: [{translateX: -75}, {translateY: -50}],
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
    zIndex: 10,
  },
  popup: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#00A925',
    alignItems: 'center',
  },
  popupText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default BookingStatus;
