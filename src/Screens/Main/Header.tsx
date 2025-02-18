import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Per_person_price from '../../../assests/per_person_price_icon.svg';

import Main_menu from '../../../assests/Main_menu.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useOzove } from '../../Context/ozoveContext';
import { styles } from '../../Components/MainStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  navigation: any;
  // handleSuggestions: (querry: any, isPickup: any) => void;
  handleLocationSelect: (location: any, isPickup: any) => void;
}
export default function Header({
  navigation,
  handleLocationSelect,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  // const {_getlocationSuggestions} = useOzove();
  // const [activeInput, setActiveInput] = React.useState('');
  // const [searchText, setSearchText] = React.useState('');
  // const [loactionSuggestions, setLocationSuggestions] = React.useState([]);
  // const [showSuggestion, setShowSuggestion] = React.useState(false);

  // const handleSuggestions = async (querry: any) => {
  //   const suggestions = await _getlocationSuggestions(querry);
  //   setLocationSuggestions(suggestions);
  // };

  // const handleSelectLocation = (location: any) => {
  //   setShowSuggestion(false);
  //   setSearchText(location?.formatted);
  //   handleLocationSelect(location, false);
  // };

  return (
    <View
      style={{
        position: 'absolute',
        top: 5,
        // left: 10,
        // width: '95%',
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        zIndex: 2,
        // backgroundColor: 'transparent',
        // height: 120,
        // backgroundColor: 'red',
        paddingTop: insets.top,
        paddingHorizontal: 10

      }}>
      <View style={{ flex: 1, }}>
        <View
          style={{
            // flex: 1,
            // flexDirection: 'row',
            // justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <View
              style={{
                height: 50,
                width: 50,
                // padding: 10,
                borderRadius: 100,
                backgroundColor: 'white',
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Main_menu />
            </View>
          </TouchableOpacity>
          {/* <View style={{ marginLeft: 20 }}>
            <TouchableOpacity onPress={() => navigation.push('QRScanner')}>
              <View
                style={{
                  height: 50,
                  width: 90,
                  padding: 10,
                  borderRadius: 100,
                  backgroundColor: 'white',
                  elevation: 5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginRight: 10 }}>
                    <Text style={{ color: '#333', fontWeight: 'bold' }}>
                      Scan
                    </Text>
                  </View>
                  <View>
                    <MaterialCommunityIcons
                      name="qrcode-scan"
                      size={24}
                      color="#000"
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View> */}
        </View>

        {/* <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 15,
              backgroundColor: 'white',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  margin: 5,
                  borderRadius: 100,
                  borderWidth: 5,
                  borderColor: '#FFAF19',
                  width: 20,
                  height: 20,
                  backgroundColor: 'white',
                }}></View>
            </View>
            <View>
              <TextInput
                style={{
                  padding: 10,
                  color: '#000',
                }}
                placeholderTextColor={'#ccc'}
                placeholder="Search for a place"
                value={searchText}
                onChangeText={text => {
                  if (text === '') setShowSuggestion(false);
                  setSearchText(text);
                  handleSuggestions(text);
                  setShowSuggestion(true);
                }}
                onFocus={() => setActiveInput('pickup')}
              />
            </View>
          </View>
          {showSuggestion &&
            loactionSuggestions?.length > 0 &&
            activeInput === 'pickup' && (
              <ScrollView
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  maxHeight: 200,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                  zIndex: 1000,
                }}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}>
                {loactionSuggestions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      padding: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: '#F0F0F0',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => handleSelectLocation(item)}>
                    <View style={{marginRight: 10}}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={20}
                        color="#007BFF"
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#333',
                          fontWeight: '500',
                        }}>
                        {item?.formatted}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
        </View> */}
      </View>
    </View>
  );
}
