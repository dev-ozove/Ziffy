import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useAppSelector} from '../../hooks/useRedux';
import {useNavigation} from '@react-navigation/native';
import {bookingData} from '../../Context/Types/ozove';
import {Vechicle_data} from '../../Config/constants';

import BackIcon from '../../../assests/Headers/Backicon.svg';
import FilterIcon from '../../../assests/Headers/filter.svg';
import HelpIcon from '../../../assests/Headers/help.svg';

import From_icon from '../../../assests/sidebar/bookings/from_icon.svg';
import To_icon from '../../../assests/sidebar/bookings/to_icon.svg';
import Avatar_Icon from '../../../assests/sidebar/bookings/Avatar_icon.svg';

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState('Pending');
  const bookings = useAppSelector(state => state.bookings.bookings);
  console.log('Booking screen ', bookings);
  const navigation = useNavigation();

  const renderBookingItem = ({item}: any) => {
    console.log('item', item);
    console.log('item.selectedVehicle', item.selectedVehicle);
    console.log(Vechicle_data[item.selectedVehicle]);
    return (
      <View style={styles.bookingItem}>
        <View style={styles.bookingHeader}>
          <Text style={styles.vehicleText}>
            {Vechicle_data[item.selectedVehicle]?.title}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>$5.28</Text>
            <View style={styles.passengerContainer}>
              <Avatar_Icon />
              <Text style={styles.passengerText}>2</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={{fontSize: 12, color: '#666', paddingBottom: 10}}>
            {Vechicle_data[item.selectedVehicle]?.details?.Full_name}
          </Text>
        </View>

        <Text style={styles.dateText}>{`${item.Date} - ${item.Time}`}</Text>

        <View style={styles.spaceContainer}>
          <From_icon />
          <Text style={styles.spaceText}>{`${item.From} `}</Text>
        </View>

        <View style={styles.spaceContainer}>
          <To_icon />
          <Text style={styles.spaceText}>{item.To}</Text>
        </View>
      </View>
    );
  };

  const tabs = ['Pending', 'Completed', 'Cancelled'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Pending':
        return (
          <FlatList
            data={bookings}
            renderItem={renderBookingItem}
            keyExtractor={(item, index) => item.OrderId}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No completed bookings</Text>
              </View>
            }
          />
        );
      case 'Completed':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.emptyStateText}>No cancelled bookings</Text>
          </View>
        );
      case 'Cancelled':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.emptyStateText}>No cancelled bookings</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings</Text>
        <View style={styles.headerRight}>
          <FilterIcon />
          <HelpIcon />
        </View>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentContainer}>{renderTabContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF1E0',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 25,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#F4AF48',
  },
  inactiveTab: {
    backgroundColor: '#FFF1E0',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFF',
  },
  inactiveTabText: {
    color: '#666',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  bookingItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  vehicleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F4AF48',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
  },
  passengerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  spaceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  spaceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});
