// reander Cards in the main screen

// const renderItem = ({item}: any) => (
//   <View
//     style={[
//       {
//         backgroundColor: 'transparent',
//         height: 180,
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       {width},
//     ]}>
//     <View
//       style={{
//         width: '80%',
//         height: '100%',
//         backgroundColor: 'white',
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 10,
//         elevation: 20,
//       }}>
//       <View style={{marginHorizontal: 10, marginVertical: 10}}>
//         <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FFAF19'}}>
//           Order Number {item?.OrderId}
//         </Text>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <View
//           style={{
//             flex: 1,
//             marginHorizontal: 10,
//             marginVertical: 10,
//             justifyContent: 'center',
//             alignItems: 'flex-start',
//             flexDirection: 'column',
//           }}>
//           <View>
//             <Text style={{fontSize: 14, fontWeight: 'bold', color: '#000'}}>
//               {item?.Vechicle}
//             </Text>
//             <Text style={{fontSize: 12, fontWeight: 'bold', color: '#ccc'}}>
//               {item?.date} - {item?.time}
//             </Text>
//           </View>
//         </View>

//         <View
//           style={{
//             flex: 1,
//             marginHorizontal: 10,
//             marginVertical: 10,
//             gap: 10,
//           }}>
//           <View style={{alignSelf: 'flex-end'}}>
//             <Text
//               style={{fontSize: 16, fontWeight: 'bold', color: '#FFAF19'}}>
//               $ {item?.price}
//             </Text>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <View style={{marginHorizontal: 5}}>
//                 <Avatar
//                   source={{
//                     uri: 'https://cdn-icons-png.flaticon.com/512/147/147140.png',
//                   }}
//                   size={'xs'}
//                 />
//               </View>
//               <Text style={{fontSize: 12, fontWeight: 'bold', color: '#000'}}>
//                 {item?.passongers}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       <View
//         style={{
//           flex: 1,
//           margin: 5,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <View style={{flex: 1, flexDirection: 'row'}}>
//           <View style={{flexDirection: 'column'}}>
//             <View>
//               <View
//                 style={{
//                   backgroundColor: 'white',
//                   borderColor: '#FFAF19',
//                   borderWidth: 5,
//                   borderRadius: 100,
//                   height: 20,
//                   width: 20,
//                 }}
//               />
//             </View>
//             <View
//               style={{
//                 backgroundColor: '#ccc',
//                 flex: 1,
//                 width: 2,
//                 alignSelf: 'center',
//               }}
//             />

//             <View>
//               <View
//                 style={{
//                   backgroundColor: '#FFAF19',
//                   borderColor: '#FFAF19',
//                   borderWidth: 5,
//                   borderRadius: 100,
//                   height: 20,
//                   width: 20,
//                 }}>
//                 <PickupLocationIcon width={10} height={10} />
//               </View>
//             </View>
//           </View>
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'column',
//             }}>
//             <View
//               style={{
//                 flex: 1,
//                 borderBottomWidth: 1,
//                 borderColor: '#ccc',
//               }}>
//               <View style={{marginHorizontal: 10}}>
//                 <Text style={{color: '#000', fontWeight: 'bold'}}>
//                   {item?.from}
//                 </Text>
//               </View>
//             </View>
//             <View
//               style={{
//                 flex: 1,
//               }}>
//               <View style={{marginHorizontal: 10}}>
//                 <Text style={{color: '#000', fontWeight: 'bold'}}>
//                   {item?.to}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   </View>
// );
