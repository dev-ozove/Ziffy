import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function InputField({
  label,
  placeholder,
  labelstyle,
  value,
  onChangeText,
  keyboardType = 'default',
  onBlur = () => {},
  isDate = false, // New prop to specify if it's a date field
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Close the picker
    if (selectedDate) {
      onChangeText(selectedDate.toISOString().split('T')[0]); // Format the date as YYYY-MM-DD
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelstyle]}>{label}</Text>
      {isDate ? (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}>
          <Text style={{color: value ? '#000' : '#aaa'}}>
            {value || placeholder}
          </Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          onBlur={onBlur}
        />
      )}
      {isDate && showDatePicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});
