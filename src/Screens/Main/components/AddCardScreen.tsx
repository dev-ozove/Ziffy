import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackIcon from '../../../../assests/back_icon.svg';

interface AddCardScreen {
  setShowNextScreen: (value: number) => void;
}

const AddCardScreen: React.FC<AddCardScreen> = ({setShowNextScreen}) => {
  return (
    <>
      <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
        <TouchableOpacity
          onPress={() => {
            setShowNextScreen(3);
          }}>
          <View>
            <BackIcon />
          </View>
        </TouchableOpacity>
        <View style={{width: '100%'}}>
          <View>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Add Card</Text>
          </View>
          {/* <ScrollView style={{marginTop: 10, marginBottom: 10}}>
                {CardDetails?.map((item, index) => {
                  const isSelected = selectedCard === index;
                  return (
                    <View
                      style={{
                        width: '100%',
                        padding: 10,
                        marginVertical: 10,
                        borderColor: isSelected ? '#FFAF19' : '#4a4a4a85',
                        backgroundColor: isSelected ? '#ffae194e' : '#ececec81',
                        borderWidth: 1,
                        borderRadius: 12,
                      }}>
                      <View>
                        <Text
                          style={{
                            color: '#4A4A4A',
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          Card Details
                        </Text>
                      </View>
                      <TouchableOpacity
                        key={index}
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}
                        onPress={() => setselectedCard(index)}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <View>
                              <Avatar_icon />
                            </View>
                            <View
                              style={{flexDirection: 'column', marginLeft: 10}}>
                              <View>
                                <Text style={{fontWeight: 'bold'}}>
                                  {item?.Title}
                                </Text>
                              </View>
                              <View>
                                <Text>{item.Number}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView> */}

          <View
            style={{
              width: '100%',
              padding: 10,
              marginBottom: 10,
              borderColor: '#4a4a4a85',
              backgroundColor: '#ececec81',
              borderWidth: 1,
              borderRadius: 12,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    color: '#000',
                  }}>
                  Add Card
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#FFAF19',
                  padding: 5,
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 200,
                }}>
                <Text style={{color: 'white', fontSize: 16}}>+</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default AddCardScreen;
