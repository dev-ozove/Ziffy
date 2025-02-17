import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import Main_menu from '../../../assests/Main_menu.svg';
import Scan_Icon from '../../../assests/Headers/scan.svg';

interface HeaderProps {
  navigation: any;
  // handleSuggestions: (querry: any, isPickup: any) => void;
  handleLocationSelect: (location: any, isPickup: any) => void;
}
export default function Header({
  navigation,
  handleLocationSelect,
}: HeaderProps) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 10,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        backgroundColor: 'transparent',
        height: 120,
      }}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <View
              style={{
                height: 50,
                width: 50,
                padding: 10,
                borderRadius: 100,
                backgroundColor: 'white',
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Main_menu />
            </View>
          </TouchableOpacity>
          <View style={{marginLeft: 20}}>
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
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginRight: 10}}>
                    <Text style={{color: '#333', fontWeight: 'bold'}}>
                      Scan
                    </Text>
                  </View>
                  <View>
                    <Scan_Icon />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
