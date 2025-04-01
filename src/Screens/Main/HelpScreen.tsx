import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HelpScreen() {
  const navigation = useNavigation();
  const helpItems = [
    {
      id: 1,
      title: 'Placing an Order',
      description: 'Place order, track status, rate drive, and more',
      icon: 'document-text-outline',
    },
    {
      id: 2,
      title: 'Order Edit and Cancellation',
      description: 'Edit Order, cancel order, change driver',
      icon: 'pencil-outline',
    },
    {
      id: 3,
      title: 'Fee, Payment and Methods',
      description: 'Request receipt, top up wallet, select payment',
      icon: 'card-outline',
    },
    {
      id: 4,
      title: 'Coupons and Promotions',
      description: 'Appl coupon or romo code, redeem rewards',
      icon: 'gift-outline',
    },
    {
      id: 5,
      title: 'Order Issues',
      description: 'No driver matched, damaged goods, complaints',
      icon: 'alert-circle-outline',
    },
    {
      id: 6,
      title: 'Corporate Customer',
      description: 'Add teammate, connect with API, issues receipt',
      icon: 'briefcase-outline',
    },
    {
      id: 7,
      title: 'General Information',
      description: 'Service types, service areas, insurance, and more',
      icon: 'information-circle-outline',
    },
    {
      id: 8,
      title: 'Send us Feedback',
      description: 'Tell us what you think about our app',
      icon: 'chatbox-ellipses-outline',
    },
  ];

  const renderHelpItem = ({title, description, icon}) => (
    <TouchableOpacity style={styles.helpItem} key={title}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color="#F4AF48" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 30,
        backgroundColor: '#fff',
      }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help Center</Text>
          <View style={styles.headerRight}>
            <Icon
              name="help-circle-outline"
              size={24}
              color="#000"
              style={styles.helpIcon}
            />
            <Icon
              name="funnel-outline"
              size={24}
              color="#000"
              style={styles.filterIcon}
            />
          </View>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.topicsHeader}>
            <Text style={styles.topicsTitle}>All topics</Text>
          </View>

          <View style={styles.helpItemsContainer}>
            {helpItems.map(item => renderHelpItem(item))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: 32,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  helpIcon: {
    padding: 4,
  },
  filterIcon: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  topicsHeader: {
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  topicsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  helpItemsContainer: {
    padding: 16,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF9F0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
