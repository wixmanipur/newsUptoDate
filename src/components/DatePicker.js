import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export const DatePicker = ({selectedDate, setSelectedDate}) => {
  //format date
  const formateDate = date => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };
  //initial date to today
  const [date, setDate] = useState(new Date());
  //visivily of date picker
  const [showPicker, setShowPicker] = useState(false);

  //date picker method
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = (events, selectedDate) => {
    if (events.type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === 'android') {
        toggleDatepicker();
        setSelectedDate(formateDate(currentDate));
      }
    } else {
      toggleDatepicker();
    }
  };
  //confirmDateonIOS
  const confirmIOSDate = () => {
    setSelectedDate(formateDate(date));
    toggleDatepicker();
  };

  return (
    <View>
      {/* <Text>Select Date</Text> */}
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
          style={styles.datepicker}
          maximumDate={new Date() - 1}
          minimumDate={new Date('2020-1-1')}
        />
      )}
      {showPicker && Platform.OS === 'ios' && (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.pickerButton,
              {backgroundColor: '#11182711'},
            ]}
            onPress={toggleDatepicker}>
            <Text style={[styles.buttonText, {color: '#075985'}]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.pickerButton,
              {backgroundColor: '#11182711'},
            ]}
            onPress={confirmIOSDate}>
            <Text style={[styles.buttonText, {color: '#075985'}]}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}
      {!showPicker && (
        <Pressable onPress={toggleDatepicker}>
          <TextInput
            placeholder="Select"
            value={selectedDate}
            onChangeText={setSelectedDate}
            placeholderTextColor="black"
            editable={false}
            style={{color: 'black'}}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#075985',
  },
  datepicker: {
    height: 100,
    marginTop: -10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
});
