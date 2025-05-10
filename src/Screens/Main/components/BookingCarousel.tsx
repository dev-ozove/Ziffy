import React, {useState} from 'react';
import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import From_icon from '../../../../assets/sidebar/bookings/from_icon.svg';
import To_icon from '../../../../assets/sidebar/bookings/to_icon.svg';
import {Vechicle_data} from '../../../Config/constants';
import {useAppSelector} from '../../../hooks/useRedux';
import {useNavigation} from '@react-navigation/native';
import {CarouselStyles} from '../../../Components/MainStyles';
import RewardsScreen from './RewardsScreen';

// Custom Card Components
const BookingCard = ({item, navigation}: any) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('BookingStatus', {bookingData: item})}>
    <View
      style={{
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderWidth: 1,
        borderColor: '#FFAF19',
        borderRadius: 12,
        height: 210,
        width: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#2D2D2D',
            fontFamily: 'Roboto-Bold',
          }}>
          {Vechicle_data[item.selectedVehicle]?.title}
        </Text>
      </View>

      <View>
        <Text
          style={{
            fontSize: 14,
            color: '#5E5E5E',
            marginBottom: 10,
            fontFamily: 'Roboto-Regular',
          }}>
          {Vechicle_data[item.selectedVehicle]?.details?.Full_name}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 13,
          color: '#6B7280',
          marginBottom: 15,
          fontFamily: 'Roboto-Medium',
        }}>{`${item.Date} - ${item.Time}`}</Text>

      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
        <From_icon style={{marginRight: 10}} />
        <Text
          style={{
            fontSize: 15,
            color: '#374151',
            fontWeight: '600',
            fontFamily: 'Roboto-SemiBold',
          }}>
          {item.From}
        </Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <To_icon style={{marginRight: 10}} />
        <Text
          style={{
            fontSize: 15,
            color: '#374151',
            fontWeight: '600',
            fontFamily: 'Roboto-SemiBold',
          }}>
          {item.To}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const RewardCard = ({item, navigation}: any) => {
  if (item?.type == 'reward')
    return (
      <View style={CarouselStyles.rewardContainer}>
        <RewardsScreen />
      </View>
    );
};

// Component Registry
const COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  booking: BookingCard,
  reward: RewardCard,
};

export default function BookingCarousel() {
  const {width} = useWindowDimensions();
  const CARD_WIDTH = width * 0.95;
  const CARD_HEIGHT = 190;
  const [activeIndex, setActiveIndex] = useState(0);

  const bookings = useAppSelector(state => state.bookings.bookings);
  const navigation = useNavigation<any>();

  // Get latest booking with type identifier
  const latestBooking =
    bookings.length > 0 ? [{...bookings[0], type: 'booking'}] : [];

  // Reward screens data
  const rewardScreens = [
    {
      id: 'reward1',
      type: 'reward',
    },
  ];

  const carouselData = [...latestBooking, ...rewardScreens];

  const renderItem = ({item}: any) => {
    const Component = COMPONENT_REGISTRY[item.type] || RewardCard;
    return <Component item={item} navigation={navigation} />;
  };

  const PaginationDots = () => (
    <View style={CarouselStyles.pagination}>
      {carouselData.map((_, index) => (
        <View
          key={index}
          style={[
            CarouselStyles.dot,
            index === activeIndex
              ? CarouselStyles.activeDot
              : CarouselStyles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={[CarouselStyles.container, {height: CARD_HEIGHT + 10}]}>
      <Carousel
        loop={true}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        data={carouselData}
        renderItem={renderItem}
        autoPlay={true}
        autoPlayInterval={3000}
        onSnapToItem={index => setActiveIndex(index)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 35,
          parallaxAdjacentItemScale: 0.75,
        }}
        style={CarouselStyles.carousel}
        snapEnabled
        pagingEnabled
      />
      <PaginationDots />
    </View>
  );
}
