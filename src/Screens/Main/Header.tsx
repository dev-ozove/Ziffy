import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';

import Main_menu from '../../../assets/Main_menu.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useOzove} from '../../Context/ozoveContext';
import {Styles, styles} from '../../Components/MainStyles';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/Logo_1.svg';
import {useRoute} from '@react-navigation/native';

interface HeaderProps {
  navigation: any;
}

export default function Header({navigation}: HeaderProps) {
  const route = useRoute();
  const isCheckingScreen = route.name === 'Checking_screen';

  return (
    <>
      <View style={{flex: 1}}>
        <LinearGradient
          colors={['rgba(255, 175, 25, 1)', 'rgba(255, 175, 25, 0)']}
          style={[styles.headerGradient, {flex: 1, width: '100%'}]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '100%',
            }}>
            <View style={{marginLeft: 20}}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() =>
                  isCheckingScreen
                    ? navigation.navigate('MainDrawer')
                    : navigation.toggleDrawer()
                }>
                <View>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 100,
                      backgroundColor: 'white',
                      elevation: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      transform: [{translateY: -20}],
                    }}>
                    {isCheckingScreen ? (
                      <MaterialCommunityIcons
                        name="close"
                        size={24}
                        color="#000"
                      />
                    ) : (
                      <Main_menu />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Logo
                  style={{transform: [{translateX: -40}, {translateY: -20}]}}
                  width={80}
                  height={80}
                  fill={'#141921'}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}
