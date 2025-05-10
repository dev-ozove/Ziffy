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
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      onPermissionsGranted?.();
      return;
    }

    checkPermissions();
  }, []);

  const getPermissions = () => {
    if (Platform.OS === 'ios') {
      return {
        camera: PERMISSIONS.IOS.CAMERA,
        location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      };
    }
    return {
      camera: PERMISSIONS.ANDROID.CAMERA,
      location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    };
  };

  const checkSinglePermission = async (
    type: string,
    permission: Permission,
  ) => {
    try {
      const result = await check(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error(`Error checking ${type} permission:`, error);
      return false;
    }
  };

  const checkPermissions = async () => {
    try {
      const permissionsToCheck = getPermissions();

      const [cameraGranted, locationGranted] = await Promise.all([
        checkSinglePermission('camera', permissionsToCheck.camera),
        checkSinglePermission('location', permissionsToCheck.location),
      ]);

      setPermissions({
        camera: cameraGranted,
        location: locationGranted,
      });

      if (cameraGranted && locationGranted) {
        onPermissionsGranted?.();
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const requestPermission = async (type: 'camera' | 'location') => {
    try {
      const permissionsToRequest = getPermissions();
      const permission = permissionsToRequest[type];

      if (!permission) {
        console.error(`No permission found for type: ${type}`);
        return;
      }

      try {
        const result = await request(permission);

        if (result === RESULTS.GRANTED) {
          setPermissions(prev => ({...prev, [type]: true}));
          checkPermissions();
        } else {
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
                text: blocked ? 'Open Settings' : 'Try Again',
                onPress: blocked
                  ? () => Linking.openSettings()
                  : () => requestPermission(type),
              },
            ],
          );
        }
      } catch (error) {
        console.error(`Error requesting ${type} permission:`, error);
        Alert.alert(
          'Permission Error',
          `There was an error requesting ${type} permission. Please try again or enable it in settings.`,
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
        );
      }
    } catch (error) {
      console.error(`Error in permission request flow:`, error);
    }
  };

  const renderPermissionButton = (
    type: 'camera' | 'location',
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
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  permissionInfo: {
    flex: 1,
    marginRight: 16,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#141921',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  permissionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFAF19',
    minWidth: 100,
    alignItems: 'center',
  },
  permissionButtonGranted: {
    backgroundColor: '#4CAF50',
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  permissionButtonTextGranted: {
    color: '#fff',
  },
});

export default PermissionHandler;
