import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MoreVehicles = ({visible, onClose}) => {
  const [isMoreEnabled, setIsMoreEnabled] = useState(false);
  const [vehicleCount, setVehicleCount] = useState(3);

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

          {/* More Vehicles Card */}
          {!isMoreEnabled && (
            <TouchableOpacity
              onPress={() => setIsMoreEnabled(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#FEEBC8',
                borderRadius: 5,
                padding: 16,
                borderWidth: 1,
                borderColor: '#E8A24D',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'DMSans36pt-Medium',
                    fontSize: 15,
                    color: '#000',
                  }}>
                  Add More Vehicles
                </Text>
                <Text
                  style={{
                    fontFamily: 'DMSans36pt-Regular',
                    fontSize: 12,
                    color: '#000',
                  }}>
                  Back Up To 3 Vehicles
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

          {/* Conditional View when isMoreEnabled is true */}
          {isMoreEnabled && (
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text
                    style={{fontFamily: 'DMSans36pt-SemiBold', fontSize: 16}}>
                    Add More Vehicles
                  </Text>
                </View>
                <Text style={{fontFamily: 'DMSans36pt-SemiBold', fontSize: 16}}>
                  10.00$
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: 'DMSans36pt-ExtraBold',
                  fontSize: 20,
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                Add An Additional
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 5,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    setVehicleCount(prev => (prev > 3 ? prev - 1 : prev))
                  }
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
                  {vehicleCount}
                </Text>
                <TouchableOpacity
                  onPress={() => setVehicleCount(prev => prev + 1)}
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
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                Van
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: '#FFAF19',
                  paddingVertical: 12,
                  borderRadius: 5,
                  width: '100%',
                  marginTop: 20,
                }}
                onPress={() => setIsMoreEnabled(false)}>
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
                Back Up To 3 Vehicles
              </Text>
            </View>
          )}

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

export default MoreVehicles;
