import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import BackIcon from '../../../../assets/Headers/Backicon.svg';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('window');

const ReviewComponent = ({backpress, ReviewPress}) => {
  const [selectedTip, setSelectedTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [customTipVisible, setCustomTipVisible] = useState(false);
  const tipAmounts = [0, 5, 10, 15, 20];
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={backpress} style={{padding: 0}}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={[styles.arrivalText, {flex: 1, marginRight: 15}]}>
          Rating
        </Text>
      </View>
      <View style={styles.driverInfoContainer}>
        <Image
          source={require('../../../../assets/DriverProfile/svgviewer-png-output.png')}
          style={styles.driverImage}
        />
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="gold" />
          <Text style={styles.rating}>4</Text>
        </View>

        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>Brooklyn Simmons</Text>
          <View style={styles.carDetailsContainer}>
            <Text style={styles.carDetails}>Toyota</Text>
            <Text style={styles.plateNumber}>15U - 4796</Text>
          </View>
        </View>
      </View>

      <Text style={styles.heading}>How was your trip with Leslie?</Text>
      <View style={styles.starsContainer}>
        {[...Array(4)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
            <Icon
              name="star"
              size={40}
              color={index < rating ? '#f5a623' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.Commentcontainer}>
        <Text style={styles.label}>Hey!</Text>
        <TextInput
          style={styles.commentBox}
          placeholder="Write your comments here..."
          placeholderTextColor="#999"
          multiline
        />
      </View>

      <Text style={styles.subHeading}>Add a tip to Brooklyn Simmons</Text>
      <View style={styles.tipsContainer}>
        {tipAmounts.map(amount => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.tipButton,
              selectedTip === amount && styles.selectedTip,
            ]}
            onPress={() => setSelectedTip(amount)}>
            <Text
              style={[
                styles.tipText,
                selectedTip === amount && styles.selectedTipText,
              ]}>
              ${amount}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* <TouchableOpacity style={styles.customButton}>
        <Text style={styles.customButtonText}>Add to custom</Text>
      </TouchableOpacity> */}

      {customTipVisible && (
        <TextInput
          style={styles.customTipInput}
          placeholder="Enter custom tip"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={customTip}
          onChangeText={setCustomTip}
        />
      )}

      <TouchableOpacity
        style={styles.customButton}
        onPress={() => setCustomTipVisible(!customTipVisible)}>
        <Text style={styles.customButtonText}>Add to custom</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.referContainer}>
        <Icon name="share" size={24} color="#666" />
        <View style={styles.referTextContainer}>
          <Text style={styles.referTitle}>Refer to Friends</Text>
          <Text style={styles.referSubtitle}>Invite your friends for Zify</Text>
        </View>
        <Icon1 name="chevron-right" size={16} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkInButton} onPress={ReviewPress}>
        <Text style={styles.checkInText}>Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 50,
  },
  arrivalText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },

  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  driverImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  carDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  carDetails: {
    fontSize: 14,
    color: '#313A48',
  },
  plateNumber: {
    backgroundColor: '#FFAF19',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
  },
  ratingContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    left: 11,
    bottom: 12,
    paddingHorizontal: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  rating: {
    marginLeft: 2,
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkInButton: {
    backgroundColor: '#F8AB1E',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  checkInText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#141921',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  Commentcontainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    minHeight: 100,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  commentBox: {
    fontSize: 16,
    minHeight: 60,
    textAlignVertical: 'top',
  },

  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  tipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginVertical: 10,
  },
  tipButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  selectedTip: {
    backgroundColor: '#f5a623',
    borderColor: '#f5a623',
  },
  tipText: {
    fontSize: 16,
    color: '#333',
  },
  selectedTipText: {
    color: '#000',
  },
  customButton: {
    backgroundColor: '#FEF3D6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFAF19',
  },
  customButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  referContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7', // Light gray background
    padding: 12,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  referTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  referTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  referSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  customTipInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ReviewComponent;
