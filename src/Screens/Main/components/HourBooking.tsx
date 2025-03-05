import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HourBooking = ({visible, onClose}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [hours, setHours] = useState(3);

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 20,
          }}>
          {/* Down Arrow */}
          <TouchableOpacity
            onPress={onClose}
            style={{
              alignSelf: 'center',
              marginBottom: 10,
              width: 40,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="#333"
            />
          </TouchableOpacity>

          {/* Hour Booking Card */}
          {!isEnabled && (
            <TouchableOpacity
              onPress={() => setIsEnabled(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FEEBC8', // Light beige background
                borderRadius: 5,
                padding: 16,
                borderWidth: 1,
                borderColor: '#E8A24D', // Orange border
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'DMSans24pt-Bold',
                    fontSize: 15,
                    color: '#000',
                  }}>
                  Hourly Bookings
                </Text>
                <Text
                  style={{
                    fontFamily: 'DMSans36pt-Regular',
                    fontSize: 12,
                    color: '#000',
                  }}>
                  Minimum 3 Hours
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: 'DMSans36pt-Medium',
                  fontSize: 16,
                  color: '#000',
                }}>
                10.00$
              </Text>
            </TouchableOpacity>
          )}

          {/* Conditional View when isEnabled is true */}
          {isEnabled && (
            <View
              style={{
                backgroundColor: '#FFF3D4',
                padding: 15,
                borderRadius: 5,
                marginTop: 5,
                borderWidth: 1,
                borderColor: '#FFAF19',
                width: '100%',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              {/* Header Section */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text
                    style={{fontFamily: 'DMSans36pt-SemiBold', fontSize: 16}}>
                    Hourly Bookings
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'DMSans36pt-Regular',
                      color: '#000',
                    }}>
                    Minimum 3 Hours
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: 'DMSans36pt-SemiBold',
                    fontSize: 16,
                  }}>
                  10.00$
                </Text>
              </View>

              {/* Hour Selection Section */}
              <Text
                style={{
                  fontFamily: 'DMSans36pt-ExtraBold',
                  fontSize: 22,
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                Book for
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 5,
                }}>
                <TouchableOpacity
                  onPress={() => setHours(prev => (prev > 3 ? prev - 1 : prev))}
                  style={{
                    borderWidth: 2,
                    borderColor: '#FFAF19',
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 24, fontWeight: 'bold', color: '#000'}}>
                    −
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginHorizontal: 40,
                  }}>
                  {hours}
                </Text>

                <TouchableOpacity
                  onPress={() => setHours(prev => prev + 1)}
                  style={{
                    backgroundColor: '#FFAF19',
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 24, fontWeight: 'bold', color: '#FFF'}}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  fontFamily: 'DMSans36pt-ExtraBold',
                  fontSize: 22,
                  textAlign: 'center',
                }}>
                Hours
              </Text>

              {/* Confirm Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFAF19',
                  paddingVertical: 12,
                  borderRadius: 5,
                  width: '100%',
                  marginTop: 20,
                }}
                onPress={() => {
                  setIsEnabled(false);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'DMSans36pt-ExtraBold',
                    fontSize: 20,
                    color: '#000',
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>

              <Text style={{textAlign: 'center', fontSize: 12, marginTop: 10}}>
                You Can Book For Minimum 3 Hours
              </Text>
            </View>
          )}

          {/* Close Modal Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#FFAF19',
              paddingVertical: 16,
              borderRadius: 5,
              marginVertical: 20,
            }}
            onPress={onClose}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'DMSans24pt-Bold',
                fontSize: 20,
                color: '#000',
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default HourBooking;
