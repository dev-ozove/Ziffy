import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../Context/authContext';

export default function AppSettingsScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const navigation = useNavigation();
  const {signOut} = useAuth();
  const handleSignOut = async () => {
    await signOut();
  };
  const favorites = [
    {id: 1, type: 'Home', location: 'Downtown Perth', status: 'set'},
    {id: 2, type: 'Work', location: '', status: 'add'},
  ];

  const renderFavoriteItem = ({type, location, status}) => (
    <View style={styles.favoriteItem} key={type}>
      <View style={styles.favoriteLeft}>
        <View style={styles.iconContainer}>
          <Icon
            name={
              type.toLowerCase() === 'home'
                ? 'home-outline'
                : 'briefcase-outline'
            }
            size={24}
            color="#F4AF48"
          />
        </View>
        <View>
          <Text style={styles.favoriteTitle}>{type}</Text>
          {location && <Text style={styles.favoriteLocation}>{location}</Text>}
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.actionButton,
          status === 'delete' ? styles.deleteButton : styles.addButton,
        ]}>
        <Text
          style={[
            styles.actionButtonText,
            status === 'delete'
              ? styles.deleteButtonText
              : styles.addButtonText,
          ]}>
          {status === 'set' ? 'Delete' : 'Add'}
        </Text>
      </TouchableOpacity>
    </View>
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
          <Text style={styles.headerTitle}>App Settings</Text>
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
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>All Settings</Text>
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Icon name="notifications-outline" size={24} color="#F4AF48" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Enable Notifications</Text>
                <Text style={styles.settingDescription}>
                  Allow us to send you push notifications
                </Text>
              </View>
            </View>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={setIsNotificationsEnabled}
              trackColor={{false: '#D1D1D6', true: '#F4AF48'}}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Favorites</Text>
          </View>
          <View style={styles.favoritesContainer}>
            {favorites.map(favorite => renderFavoriteItem(favorite))}
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>Privacy</Text>
            <Text style={styles.menuItemDescription}>
              Manage the data you share with us
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>Security</Text>
            <Text style={styles.menuItemDescription}>
              Control your account security with 2-step verification
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>Communication</Text>
            <Text style={styles.menuItemDescription}>
              Choose your preferred contact methods and manage your notification
              settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.signOutButton}>
            <Icon name="log-out-outline" size={20} color="#FF3B30" />
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  favoritesContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  favoriteLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  favoriteLocation: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  addButton: {
    backgroundColor: '#FFF9F0',
  },
  deleteButton: {
    backgroundColor: '#FFE5E5',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButtonText: {
    color: '#F4AF48',
  },
  deleteButtonText: {
    color: '#FF3B30',
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  signOutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
  },
});
