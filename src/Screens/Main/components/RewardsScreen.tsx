import {View, Text} from 'react-native';
import React from 'react';
import Cards from '../../../Components/Cards';
import Cards1 from '../../../Components/Cards1';

import Refer_Logo from '../../../../assests/Refer_card/refer_logo.svg';
import Refer_Icon from '../../../../assests/Refer_card/card_car_icon.svg';
import On_Demand from '../../../../assests/Refer_card/On_demand_icon.svg';
import Promos from '../../../../assests/Refer_card/Promos.svg';
import Saftey from '../../../../assests/Refer_card/Saftey.svg';
import Ready from '../../../../assests/Refer_card/Ready.svg';
import Addvertisment_icon from '../../../../assests/Addvertisment/Addvertisment_icon.svg';

export default function RewardsScreen() {
  return (
    <>
      <View
        style={{
          height: 150,
          width: '100%',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 12,
          backgroundColor: '#fff',
          elevation: 1,
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
                color: '#000',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Refer and Earn !
            </Text>
            <View style={{width: '80%'}}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 400,
                }}>
                Invite Your Friends to try OZ Ove Get Upto $15 cashback
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
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
                borderRadius: 10,
                color: '#767676',
              }}>
              OZ M48OVE
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Refer_Logo style={{bottom: -5}} height={100} />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 10,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
          }}>
          <Cards
            Icon={<Refer_Icon height={40} />}
            title={'Pick up friends along the way'}
            subTitle={'Add stops'}
          />
          <Cards
            Icon={<Promos height={50} />}
            title={'You have Multiple Promos'}
            subTitle={'Check'}
          />
          <Cards
            title={`Ready then let's roll`}
            subTitle={'Ride Ozove'}
            Icon={<Ready height={60} />}
          />
        </View>

        <View style={{flex: 1}}>
          <Cards
            Icon={<On_Demand height={50} />}
            title={'On Demand Delivery'}
            subTitle={'Send Packages'}
          />
          <Cards1
            Icon={<Saftey height={80} />}
            buttonTitle={'Saftey Toolkit'}
            subTitle={'On trip help with Saftey issue.'}
            title={'How it Works'}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginVertical: 20,
          flexDirection: 'row',
          height: 150,
          borderRadius: 15,
          borderWidth: 2,
          borderColor: '#FFAF19',
          elevation: 5,
          backgroundColor: '#FFEFD1',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{overflow: 'hidden'}}>
            <Addvertisment_icon
              style={{overflow: 'visible'}}
              height={150}
              width={150}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#000',
                fontSize: 20,
              }}>
              Full/Part Time Partner
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#000',
                fontSize: 14,
              }}>
              Earn $300-$500 /month *
            </Text>
          </View>
          <View style={{marginTop: 5, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                Make Money
              </Text>
            </View>
            <View style={{flex: 1}}></View>
          </View>
        </View>
      </View>
    </>
  );
}
