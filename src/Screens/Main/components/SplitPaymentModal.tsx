import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Switch} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SplitPaymentModal = ({
  visible,
  onClose,
  back,
  isSecondaryEnabled,
  setIsSecondaryEnabled,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  //   const [isSecondaryEnabled, setIsSecondaryEnabled] = useState(false);
  const [passengers, setPassengers] = useState(1);

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
            onPress={back}
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

          {/* Split Payment Card */}
          {!isEnabled && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#F1F2F6',
                borderRadius: 5,
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <View>
                <Text style={{fontFamily: 'DMSans24pt-Bold', fontSize: 16}}>
                  Split Payment
                </Text>
                <Text style={{color: '#000', fontSize: 12}}>
                  (Split Among Friends)
                </Text>
              </View>
              <Switch
                trackColor={{false: '#D1D1D1', true: '#FFAF19'}}
                thumbColor={'#fff'}
                ios_backgroundColor="#D1D1D1"
                onValueChange={() => {
                  setIsEnabled(true);
                  setIsSecondaryEnabled(true);
                }}
                value={isSecondaryEnabled}
                style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
              />
            </View>
          )}

          {/* Conditional View when isEnabled is true */}
          {isEnabled && (
            <View
              style={{
                backgroundColor: '#FEEBC8',
                padding: 15,
                borderRadius: 10,
                marginTop: 15,
                borderWidth: 1,
                borderColor: '#FFAF19',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'DMSans36pt-Regular',
                    fontSize: 14,
                    flex: 1,
                  }}>
                  Split Payments
                </Text>
                <View style={{bottom: 4}}>
                  <Switch
                    trackColor={{false: '#D1D1D1', true: '#FFAF19'}}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#D1D1D1"
                    onValueChange={() => {
                      setIsEnabled(false);
                      setIsSecondaryEnabled(false);
                    }}
                    value={isSecondaryEnabled}
                  />
                </View>
              </View>

              {/* Number of Passengers Section */}
              <Text style={{fontFamily: 'DMSans36pt-ExtraBold', fontSize: 18}}>
                Number of passengers
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 15,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    setPassengers(prev => (prev > 1 ? prev - 1 : prev))
                  }
                  style={{
                    backgroundColor: '#FFAF19',
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 24, fontWeight: 'bold'}}>−</Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginHorizontal: 20,
                  }}>
                  {passengers}
                </Text>

                <TouchableOpacity
                  onPress={() => setPassengers(prev => prev + 1)}
                  style={{
                    backgroundColor: '#FFAF19',
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 24, fontWeight: 'bold'}}>+</Text>
                </TouchableOpacity>
              </View>

              {/* Confirm Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFAF19',
                  paddingVertical: 12,
                  borderRadius: 8,
                  width: '100%',
                }}
                onPress={() => {
                  setIsEnabled(false);
                  setIsSecondaryEnabled(true);
                }}>
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

              {/* Extra Fee Notice */}
              <Text style={{fontSize: 12, color: '#555', marginTop: 5}}>
                A fee of $5 will be charged upfront
              </Text>
            </View>
          )}

          {/* Confirm Button */}
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

export default SplitPaymentModal;
