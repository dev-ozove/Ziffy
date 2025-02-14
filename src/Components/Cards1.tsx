import {View, Text} from 'react-native';
import React from 'react';
import Right_arrow from '../../assests/Refer_card/right_arrow.svg';

interface CardsProps {
  Icon: any;
  title: string;
  subTitle: string;
  buttonTitle: string;
}

export default function Cards1(props: CardsProps) {
  return (
    <View
      style={{
        width: '100%',
        marginVertical: 5,
        height: 250,
        padding: 10,
        borderRadius: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#333',
      }}>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'left',
          }}>
          {props?.title}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            textAlign: 'left',
          }}>
          {props?.subTitle}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            flexDirection: 'row',
            gap: 10,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {props?.buttonTitle}
          </Text>
          <View style={{flex: 1}}>
            <Right_arrow />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          {props?.Icon}
        </View>
      </View>
    </View>
  );
}
