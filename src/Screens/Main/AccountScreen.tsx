import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppSelector} from '../../hooks/useRedux';
import {getAuth} from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';

// Import the avatar icon
import avatarIcon from '../../../assets/avtar_icon.png';

export default function AccountScreen() {
  const User = useAppSelector(state => state.user.user);
  const auth = getAuth();
  console.log(User);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 30,
        backgroundColor: '#fff',
      }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Picture */}
        <View style={styles.profileContainer}>
          <Image source={avatarIcon} style={styles.profileImage} />
          <Text style={styles.userName}>
            {auth?.currentUser?.displayName || 'User Name'}
          </Text>
          <TouchableOpacity>
            <Text style={styles.updateProfileText}>Update Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* User Details */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>User Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={auth?.currentUser?.displayName || 'User Name'}
              style={styles.input}
              editable={false}
            />
            <MaterialIcons name="edit" size={20} color="#FFC107" />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={auth?.currentUser?.email || 'User Email'}
              style={styles.input}
              editable={false}
            />
            <MaterialIcons name="edit" size={20} color="#FFC107" />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={
                auth?.currentUser?.phoneNumber ||
                'Phone Number is not available'
              }
              style={styles.input}
              editable={false}
            />
            <MaterialIcons name="edit" size={20} color="#FFC107" />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={User?.dob || 'Update Your DOB'}
              style={styles.input}
              editable={false}
            />
            <MaterialIcons name="edit" size={20} color="#FFC107" />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderPicker}>
            {['Male', 'Female', 'Other'].map((gender, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genderOption,
                  User?.gender.toLowerCase() === gender.toLowerCase() &&
                    styles.genderOptionSelected,
                ]}
                onPress={() => console.log(`Selected: ${gender}`)} // Replace with your state update logic
              >
                <Text
                  style={[
                    styles.genderText,
                    User?.gender.toLowerCase() === gender.toLowerCase() &&
                      styles.genderTextSelected,
                  ]}>
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  updateProfileText: {
    color: '#FFAF19',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#FFAF19',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },

  genderPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  genderOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFAF19',
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  genderOptionSelected: {
    backgroundColor: '#FFAF19',
  },
  genderText: {
    color: '#333',
    fontSize: 14,
  },
  genderTextSelected: {
    color: '#333',
    fontWeight: 'bold',
  },
});
