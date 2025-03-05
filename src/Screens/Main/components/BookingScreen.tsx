import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Per_person_price from '../../../assets/per_person_price_icon.svg';

interface BookingScreenProps {
  setSelectedVehicle: any;
  selectedVehicle: any;
  selecetedAdditonalServices: any;
  setSelectedAdditonalServices: any;
  Additional_services: any;
  Vechicle_data: any;
}

const BookingScreen: React.FC<BookingScreenProps> = ({
  setSelectedVehicle,
  selectedVehicle,
  selecetedAdditonalServices,
  setSelectedAdditonalServices,
  Additional_services,
  Vechicle_data,
}) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Select Date and Time
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 1}}></View>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 20,
            color: '#4A4A4A',
            fontWeight: 'bold',
          }}>
          Select Vehicle Type
        </Text>
        <ScrollView
          horizontal
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 10,
            marginTop: 20,
          }}>
          {Vechicle_data?.map((item, index) => {
            const isSelected = selectedVehicle === index;
            return (
              <TouchableOpacity
                key={index}
                style={{}}
                onPress={() => setSelectedVehicle(index)}>
                <View
                  key={index}
                  style={{
                    width: 150,
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                    marginHorizontal: 10,
                    backgroundColor: '#F0EFEf',
                    borderWidth: 3,
                    borderColor: isSelected ? '#FFAF19' : 'transparent',
                  }}>
                  <View
                    style={{
                      marginLeft: 10,
                      height: 70,
                      width: 90,
                    }}>
                    <Image
                      style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'contain',
                        margin: 5,
                        borderRadius: 12,
                      }}
                      source={item?.image}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                    }}>
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          color: '#4A4A4A',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        {item?.title}
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={{color: '#767676'}}>
                        {`${item?.capacity} seater`}
                      </Text>
                    </View>
                    <View style={{marginLeft: 10, paddingBottom: 20}}>
                      <Text
                        style={{
                          color: '#333',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {item?.price != 0 ? (
                          `$${item.price}`
                        ) : (
                          <Text
                            style={{
                              color: '#333',
                              fontSize: 14,
                              fontWeight: 'bold',
                            }}>
                            Comming Soon{' '}
                          </Text>
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {selectedVehicle !== null && (
          <View
            style={{
              marginVertical: 20,
              height: 'auto',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#FFAF19',
              elevation: 5,
              backgroundColor: '#FFEFC5',
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 2}}>
                <Text
                  style={{
                    color: '#333',
                    padding: 10,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {Vechicle_data[selectedVehicle]?.details.Full_name}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Per_person_price width={40} height={40} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginLeft: 10,
                      }}>
                      {`$${Vechicle_data[selectedVehicle]?.details.per_person_price}`}
                    </Text>
                    <View>
                      <Text style={{color: '#000'}}>/person</Text>
                    </View>
                  </View>
                </View>

                <View style={{marginTop: 20, padding: 10}}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>{`8-13 | 12:33 pm | 3-5 min away`}</Text>

                  <Text
                    style={{
                      marginTop: 5,
                      color: '#767676',
                      fontWeight: 'bold',
                    }}>{`Minimum ${Vechicle_data[selectedVehicle]?.details?.minimum_capacity} Passengers`}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    marginLeft: -80,
                    height: 150,
                    width: 200,
                    resizeMode: 'contain',
                  }}
                  source={Vechicle_data[selectedVehicle]?.details?.image}
                />
              </View>
            </View>
          </View>
        )}

        {selectedVehicle !== null && (
          <View
            style={{
              marginVertical: 20,
              height: 'auto',
              marginBottom: 100,
            }}>
            <View>
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Additional Services
              </Text>
            </View>
            {Additional_services?.map((item: any, index: number) => {
              const isSelected = selecetedAdditonalServices === index;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedAdditonalServices(index)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 20,
                      borderRadius: 12,
                      backgroundColor: '#F0EFEF',
                      marginVertical: 5,
                      borderWidth: 2,
                      elevation: isSelected ? 1 : 0,
                      borderColor: isSelected ? '#FFAF19' : 'transparent',
                    }}>
                    <View>
                      <Text style={{color: '#000', fontWeight: 500}}>
                        {item?.title}
                      </Text>
                    </View>
                    <View>
                      {item?.price !== 0 ? (
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: 500,
                          }}>{`${item?.price} $`}</Text>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </>
  );
};

export default BookingScreen;
