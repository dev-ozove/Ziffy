import {View, Text} from 'react-native';
import React from 'react';

import Refer_Logo from '../../../../assets/Refer_card/refer_logo.svg';

export default function RewardsScreen() {
  return (
    <>
      <View
        style={{
          height: 180,
          width: '100%',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 12,
          padding: 16,
          backgroundColor: '#fff',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{margin: 5}}>
            <Text
              style={{
                fontFamily: 'DMSans36pt-ExtraBold',
                color: '#000',
                fontSize: 20,
                marginBottom: 10,
              }}>
              Refer and Earn !
            </Text>
            <View style={{width: '80%'}}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 400,
                }}>
                Invite Your Friends to try OZ Ove {'\n'}Get Upto $15 cashback
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'DMSans36pt-SemiBold',
                  fontSize: 16,
                }}>
                Share invite code{' '}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{backgroundColor: 'transparent'}}>
            <Text
              style={{
                padding: 5,
                backgroundColor: '#E7EAEC',
                margin: 5,
                textAlign: 'center',
                borderRadius: 5,
                color: '#767676',
              }}>
              ZI M48OVE
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Refer_Logo style={{bottom: -5}} height={100} />
          </View>
        </View>
      </View>
    </>
  );
}
