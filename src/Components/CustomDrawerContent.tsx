import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useAuth} from '../Context/authContext';
import {useAppSelector} from '../hooks/useRedux';
import {getAuth} from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Bookings from '../../assests/sidebar/Bookings.svg';
import Contact from '../../assests/sidebar/Contacts.svg';
import Settings from '../../assests/sidebar/Settings.svg';
import Signout from '../../assests/sidebar/Sign_out.svg';

const CustomDrawerContent = (props: any) => {
  const user = useAppSelector(state => state.user.user);
  const userTheme = user?.deviceDetails;
  const {signOut} = useAuth();
  const auth = getAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const menuItems = [
    {
      id: 1,
      title: 'Bookings',
      icon: <Bookings />,
      route: 'Bookings',
    },
    {
      id: 2,
      title: 'Help',
      icon: <Contact />,
      route: 'Help',
    },
    {
      id: 3,
      title: 'App Settings',
      icon: <Settings />,
      route: 'AppSettings',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View
        style={[
          styles.profileSection,
          userTheme
            ? {
                backgroundColor: userTheme.bgColor
                  ? userTheme.bgColor
                  : '#FFAF19',
              }
            : {
                backgroundColor: '#FFAF19',
              },
        ]}>
        <View style={styles.profileContent}>
          <Image
            source={{
              uri:
                auth.currentUser?.photoURL || 'https://via.placeholder.com/150',
            }}
            style={styles.profileImage}
          />
          <Text
            style={[
              styles.profileName,
              userTheme
                ? {
                    color: userTheme.textColor ? userTheme.textColor : '#000',
                  }
                : {
                    color: '#000',
                  },
            ]}>
            {auth.currentUser?.displayName}
          </Text>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => props.navigation.navigate('Account')}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => props.navigation.navigate(item.route)}>
            {item.icon}
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        {/* <Icon name="logout" size={20} color="#FF3B30" /> */}
        <Signout />
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileContent: {
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  editProfileButton: {
    paddingVertical: 4,
  },
  editProfileText: {
    fontSize: 14,
    color: '#000',
  },
  menuContainer: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#000',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    margin: 24,
    padding: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  signOutText: {
    color: '#FF3B30',
    fontSize: 16,
    marginLeft: 12,
  },
});

export default CustomDrawerContent;
