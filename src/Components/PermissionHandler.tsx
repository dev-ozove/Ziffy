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
  checkMultiple,
  requestMultiple,
  Permission,
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

  const getPermissions = (): Record<string, Permission> => {
    if (Platform.OS === 'ios') {
      return {
        camera: PERMISSIONS.IOS.CAMERA,
        location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        notifications: PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
      };
    }
    return {
      camera: PERMISSIONS.ANDROID.CAMERA,
      location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      notifications: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    };
  };

  const checkPermissions = async () => {
    try {
      const permissionsToCheck = getPermissions();
      const statuses = await checkMultiple([
        permissionsToCheck.camera,
        permissionsToCheck.location,
        permissionsToCheck.notifications,
      ]);

      const updatedPermissions = {
        camera: statuses[permissionsToCheck.camera] === RESULTS.GRANTED,
        location: statuses[permissionsToCheck.location] === RESULTS.GRANTED,
        notifications:
          statuses[permissionsToCheck.notifications] === RESULTS.GRANTED,
      };

      setPermissions(updatedPermissions);

      if (
        updatedPermissions.camera &&
        updatedPermissions.location &&
        updatedPermissions.notifications
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
      const permissionsToRequest = getPermissions();
      const permission = permissionsToRequest[type];

      if (!permission) {
        console.error(`No permission found for type: ${type}`);
        return;
      }

      if (type === 'notifications') {
        Alert.alert(
          'Notification Permission',
          'Please enable notifications in your device settings to receive important updates.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => openSettings()},
          ],
        );
        return;
      }

      try {
        console.log(`Requesting permission for ${type}:`, permission);
        const result = await request(permission);
        console.log(`Permission result for ${type}:`, result);

        if (result === RESULTS.GRANTED) {
          setPermissions(prev => ({...prev, [type]: true}));
          checkPermissions();
        } else {
          // Handle denied or blocked permissions
          const blocked =
            result === RESULTS.BLOCKED || result === RESULTS.DENIED;
          Alert.alert(
            'Permission Required',
            blocked
              ? `Please enable ${type} permission in your device settings to use this feature.`
              : `Please grant ${type} permission to use this feature.`,
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Open Settings',
                onPress: () => openSettings(),
              },
            ],
          );
        }
      } catch (error) {
        console.error(`Error requesting ${type} permission:`, error);
        Alert.alert(
          'Permission Error',
          `There was an error requesting ${type} permission. Please try again.`,
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => openSettings()},
          ],
        );
      }
    } catch (error) {
      console.error(`Error in permission request flow:`, error);
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
