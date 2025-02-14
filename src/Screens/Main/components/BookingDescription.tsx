import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import BackIcon from '../../../../assests/back_icon.svg';
import {useOzove} from '../../../Context/ozoveContext';
import {styles} from '../../../Components/MainStyles';
import {Vechicle_data} from '../../../Config/constants';

interface BookingDescription {
  showNextScreen: number;
  setShowNextScreen: (value: number) => void;
  set_contactDetails: (value: any) => void;
  contactDetails: any;
  notes: string;
  set_notes: (value: string) => void;
  selectedVehicle: number | null;
  setPassenger_Count: (value: number) => void;
  passenger_Count: number;
}

interface ContactInfo {
  name: string;
  phoneNumber: string;
}

const BookingDescription: React.FC<BookingDescription> = ({
  showNextScreen,
  setShowNextScreen,
  set_contactDetails,
  contactDetails,
  notes,
  set_notes,
  selectedVehicle,
  setPassenger_Count,
  passenger_Count,
}) => {
  const {bookingData} = useOzove();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    phoneNumber: '',
  });
  const minimumCapacity =
    Vechicle_data[selectedVehicle || 0]?.details?.minimum_capacity;
  const [showForm, setShowForm] = useState(false);
  const [savedContact, setSavedContact] = useState<ContactInfo | null>(null);
  const PassengerLimit =
    Vechicle_data[selectedVehicle || 0]?.details?.maximum_capacity;
  const [passengerCount, setPassengerCount] = useState(minimumCapacity);

  const handleSomeoneElseClick = () => {
    set_contactDetails('Someone_else');
    setShowForm(true);
  };

  const handleSave = () => {
    if (contactInfo.name && contactInfo.phoneNumber) {
      setSavedContact(contactInfo);
      set_contactDetails(contactInfo);
      setShowForm(false);
    }
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        onPress={() => setShowNextScreen(showNextScreen - 1)}
        style={styles.backButton}>
        <BackIcon />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Booking Details</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pick Up Contact Details</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                set_contactDetails('me');
                setShowForm(false);
              }}
              style={[
                styles.button,
                contactDetails === 'me' && styles.activeButton,
              ]}>
              <Text style={styles.buttonText}>ME</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSomeoneElseClick}
              style={[
                styles.button,
                contactDetails === 'Someone_else' && styles.activeButton,
              ]}>
              <Text style={styles.buttonText}>Someone Else</Text>
            </TouchableOpacity>
          </View>
          {contactDetails === 'Someone_else' && showForm ? (
            <View style={styles.contactInputsContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={contactInfo.name}
                onChangeText={text =>
                  setContactInfo(prev => ({...prev, name: text}))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={contactInfo.phoneNumber}
                onChangeText={text =>
                  setContactInfo(prev => ({...prev, phoneNumber: text}))
                }
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : contactDetails === 'Someone_else' && savedContact ? (
            <View style={styles.savedContactContainer}>
              <View style={styles.savedContactInfo}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                  Saved Someone Else Contact
                </Text>
                <Text
                  style={
                    styles.savedContactText
                  }>{`Name: ${savedContact.name}`}</Text>
                <Text style={styles.savedContactPhone}>
                  {`Contact Number: ${savedContact.phoneNumber}`}
                </Text>
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.notesContainer}>
          <TextInput
            style={styles.notesInput}
            placeholder="Notes For Driver"
            placeholderTextColor="#888"
            multiline={true}
            value={notes}
            onChangeText={set_notes}
          />
        </View>

        {/* Passenger Counter Section */}
        <View
          style={{
            marginBottom: 25,
            paddingHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#141921',
              marginBottom: 8,
              alignSelf: 'flex-start',
            }}>
            Specify Number of Passengers
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#767676',
              marginBottom: 20,
              alignSelf: 'flex-start',
            }}>
            Kindly specify the number of people traveling
          </Text>

          {/* Passenger Counter Container */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F0F0F0',
              borderRadius: 30,
              paddingVertical: 6,
              paddingHorizontal: 15,
              width: 180,
              borderWidth: 1,
              borderColor: '#E0E0E0',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  //handleChange(minimumCapacity, false);
                  setPassenger_Count(
                    Math.max(minimumCapacity, passenger_Count - 1),
                  );
                }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                }}>
                <Text style={{fontSize: 24, color: '#FFAF19', marginBottom: 4}}>
                  -
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: '#141921',
                  marginHorizontal: 20,
                  minWidth: 40,
                  textAlign: 'center',
                }}>
                {passenger_Count}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setPassenger_Count(
                    Math.min(PassengerLimit, passenger_Count + 1),
                  );
                }}
                style={{
                  backgroundColor: '#FFAF19',
                  borderRadius: 20,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                }}>
                <Text style={{fontSize: 24, color: '#FFFFFF', marginBottom: 4}}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingDescription;
