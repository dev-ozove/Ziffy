import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {useNavigation} from '@react-navigation/native';

interface PermissionHandlerProps {
  onPermissionsGranted?: () => void;
}

const PermissionHandler: React.FC<PermissionHandlerProps> = ({
  onPermissionsGranted,
}) => {
  const [permissions, setPermissions] = useState({
    camera: false,
    location: false,
    notifications: false,
  });
  const navigation = useNavigation();

  const checkPermissions = async () => {
    try {
      // Check camera permission
      const cameraPermission = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      );

      // Check location permission
      const locationPermission = await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      // For notifications, we'll assume it's granted initially
      // The actual notification permission will be handled by the OS
      setPermissions({
        camera: cameraPermission === RESULTS.GRANTED,
        location: locationPermission === RESULTS.GRANTED,
        notifications: true, // We'll handle notifications separately
      });

      if (
        cameraPermission === RESULTS.GRANTED &&
        locationPermission === RESULTS.GRANTED
      ) {
        onPermissionsGranted?.();
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const requestPermission = async (
    type: 'camera' | 'location' | 'notifications',
  ) => {
    try {
      if (type === 'notifications') {
        // For notifications, we'll open the app settings
        // This is because notification permissions are typically handled by the OS
        Alert.alert(
          'Notification Permission',
          'Please enable notifications in your device settings to receive updates about your bookings.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => openSettings(),
            },
          ],
        );
        return;
      }

      let permission;
      switch (type) {
        case 'camera':
          permission =
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.CAMERA
              : PERMISSIONS.ANDROID.CAMERA;
          break;
        case 'location':
          permission =
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
              : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
          break;
      }

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        setPermissions(prev => ({...prev, [type]: true}));
        checkPermissions();
      } else if (result === RESULTS.DENIED) {
        Alert.alert(
          'Permission Required',
          `Please grant ${type} permission to use this feature.`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => openSettings(),
            },
          ],
        );
      }
    } catch (error) {
      console.error(`Error requesting ${type} permission:`, error);
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  const renderPermissionButton = (
    type: 'camera' | 'location' | 'notifications',
    title: string,
    description: string,
  ) => (
    <View style={styles.permissionItem}>
      <View style={styles.permissionInfo}>
        <Text style={styles.permissionTitle}>{title}</Text>
        <Text style={styles.permissionDescription}>{description}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.permissionButton,
          permissions[type] && styles.permissionButtonGranted,
        ]}
        onPress={() => requestPermission(type)}>
        <Text
          style={[
            styles.permissionButtonText,
            permissions[type] && styles.permissionButtonTextGranted,
          ]}>
          {permissions[type] ? 'Granted' : 'Grant'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Required Permissions</Text>
      <Text style={styles.subHeader}>
        Please grant the following permissions to use all features of the app
      </Text>

      {renderPermissionButton(
        'camera',
        'Camera Access',
        'Required for scanning QR codes and taking photos',
      )}
      {renderPermissionButton(
        'location',
        'Location Access',
        'Required for finding nearby services and navigation',
      )}
      {renderPermissionButton(
        'notifications',
        'Notifications',
        'Required for receiving updates about your bookings',
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#141921',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  permissionInfo: {
    flex: 1,
    marginRight: 16,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#141921',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#666',
  },
  permissionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFAF19',
  },
  permissionButtonGranted: {
    backgroundColor: '#4CAF50',
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  permissionButtonTextGranted: {
    color: '#fff',
  },
});

export default PermissionHandler;
