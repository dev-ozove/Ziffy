import {View, Text} from 'react-native';
import React from 'react';
import Right_arrow from '../../assets/Refer_card/right_arrow.svg';

interface CardsProps {
  Icon: any;
  title: string;
  subTitle: string;
}

export default function Cards(props: CardsProps) {
  return (
    <View
      style={{
        width: '100%',
        marginVertical: 5,
        height: 120,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#141921',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
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
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {props?.subTitle}
          </Text>
          <View>
            <Right_arrow />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {props?.Icon}
        </View>
      </View>
    </View>
  );
}
