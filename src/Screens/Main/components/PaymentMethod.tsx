import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackIcon from '../../../../assets/back_icon.svg';

const PaymentMethod = ({setShowPaymentView}) => {
  const [showcardtView, setShowcardView] = useState(false);
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cards, setCards] = useState([1]);
  const [showSocial, setShowSocial] = useState(false);

  const handleSaveCard = () => {
    if (cardNumber.join('').length === 16 && month && year && cardHolder) {
      const newCard = {
        number: `**** **** **** ${cardNumber[3]}`,
        holder: cardHolder,
      };
      setCards([...cards, newCard]); // Add new card to the list
      setShowcardView(false); // Hide form after saving
      setShowSocial(true);
      setCardNumber(['', '', '', '']); // Reset inputs
      setMonth('');
      setYear('');
      setCardHolder('');
    } else {
      Alert.alert('Please enter valid card details');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowPaymentView(false)}
        style={styles.backButton}>
        <BackIcon />
      </TouchableOpacity>
      <Text style={styles.title}>Select payment method</Text>
      {/* Apple Pay */}
      {!showSocial && (
        <TouchableOpacity style={styles.paymentOption}>
          <Image
            source={require('../../../../assets/Vechicles/AppleIcon.png')}
            style={styles.logo}
          />
          <Text style={styles.paymentText}>Apple Pay</Text>
        </TouchableOpacity>
      )}
      {!showSocial && (
        <TouchableOpacity style={styles.paymentOption}>
          <Image
            source={require('../../../../assets/Vechicles/googleIcon.png')}
            style={styles.logo}
          />
          <Text style={styles.paymentText}>Google Pay</Text>
        </TouchableOpacity>
      )}

      {cards.map((card, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => setShowPaymentView(false)}>
          <Text style={styles.header}>Card Details</Text>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Icon name="person" size={30} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.personalText}>Personal</Text>
              <Text style={styles.cardText}>Visa 0493</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#868886" />
          </View>
        </TouchableOpacity>
      ))}

      {/* Add Card */}
      {!showcardtView && (
        <TouchableOpacity
          style={styles.addCard}
          onPress={() => setShowcardView(true)}>
          <Text style={styles.addCardText}>Add Card</Text>
          <Icon name="add-circle-outline" size={24} color="#FFAF19" />
        </TouchableOpacity>
      )}

      {/* new  */}
      {showcardtView && (
        <View style={styles.container1}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.title1}>Add Card</Text>
            <TouchableOpacity
              onPress={() => setShowcardView(false)}
              style={styles.backButton1}>
              <Icon name="arrow-upward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Card Number */}
          <Text style={styles.label1}>Card Number</Text>
          <View style={styles.cardNumberContainer1}>
            {cardNumber.map((num, index) => (
              <TextInput
                key={index}
                style={styles.cardInput1}
                maxLength={4}
                keyboardType="numeric"
                value={num}
                onChangeText={text => {
                  let newArr = [...cardNumber];
                  newArr[index] = text;
                  setCardNumber(newArr);
                }}
              />
            ))}
          </View>

          {/* Month & Year */}
          <View style={styles.row}>
            <View style={styles.inputContainer1}>
              <Text style={styles.label1}>Select Month</Text>
              <TextInput
                style={styles.input1}
                maxLength={2}
                keyboardType="numeric"
                placeholderTextColor={'#000'}
                placeholder="07"
                value={month}
                onChangeText={setMonth}
              />
              <TouchableOpacity style={styles.backButton2}>
                <Icon name="arrow-downward" size={15} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer1}>
              <Text style={styles.label1}>Select Year</Text>
              <TextInput
                style={styles.input1}
                maxLength={4}
                placeholderTextColor={'#000'}
                keyboardType="numeric"
                placeholder="2024"
                value={year}
                onChangeText={setYear}
              />
              <TouchableOpacity style={styles.backButton2}>
                <Icon name="arrow-downward" size={15} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.label1}>Cardholder Name</Text>
          <TextInput
            style={styles.input1}
            placeholder="Rick Ashley"
            placeholderTextColor={'#000'}
            value={cardHolder}
            onChangeText={setCardHolder}
          />

          <TouchableOpacity style={styles.saveButton1} onPress={handleSaveCard}>
            <Text style={styles.saveButtonText1}>Save Card</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'DMSans36pt-ExtraBold',
    color: '#000',
    marginBottom: 10,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  paymentText: {
    fontSize: 20,
    fontFamily: 'DMSans36pt-SemiBold',
    color: '#000',
  },
  card: {
    backgroundColor: '#ffae194e',
    borderRadius: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFAF19',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontFamily: 'DMSans36pt-SemiBold',
    color: '#000',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFAF19',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  personalText: {
    fontSize: 16,
    fontFamily: 'DMSans36pt-SemiBold',
    color: '#7D7B7B',
  },
  cardText: {
    fontSize: 14,
    fontFamily: 'DMSans36pt-Regular',
    color: '#8C8B8B',
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'space-between',
  },
  addCardText: {
    fontSize: 16,
    fontFamily: 'DMSans36pt-SemiBold',
    color: '#000',
  },

  //newwwwwwww

  container1: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 5,
  },
  backButton1: {
    marginTop: 4,
    backgroundColor: '#FFAF19',
    height: 20,
    width: 20,
    borderRadius: 30,
  },
  backButton2: {
    position: 'absolute',
    right: 8,
    bottom: 9,
    marginTop: 4,
    backgroundColor: '#000',
    height: 15,
    width: 15,
    borderRadius: 30,
  },
  title1: {
    flex: 1,
    fontSize: 19,
    fontFamily: 'DMSans36pt-SemiBold',
    marginBottom: 15,
  },
  label1: {
    fontSize: 10,
    fontFamily: 'DMSans36pt-Regular',
    marginBottom: 5,
  },
  cardNumberContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cardInput1: {
    width: '22%',
    padding: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 14,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputContainer1: {
    width: '35%',
    marginRight: 10,
    marginBottom: 6,
  },
  input1: {
    padding: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  saveButton1: {
    marginTop: 15,
    backgroundColor: '#FFAF19',
    padding: 10,
    alignItems: 'center',
  },
  saveButtonText1: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});

export default PaymentMethod;
