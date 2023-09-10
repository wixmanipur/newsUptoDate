import {
  ScrollView,
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {DatePicker} from '../components/DatePicker';

export const SelectPlans = () => {
  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const [selectedNews, setSelectedNews] = useState('The Sangai Express');

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text style={styles.selectAPlanTocontinue}>
          Select a Plan To continue
        </Text>
      </View>

      <View style={styles.scrollView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.scrollViewItems}>
            <View>
              <Text style={styles.planTitle}>Free Trial</Text>
              <Text>₹ free/year</Text>
            </View>
            <View style={styles.planFeatureContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="checkmark-sharp" size={16} color="gold" />
                <Text> Valid for {selectedDate}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="checkmark-sharp" size={16} color="gold" />
                <Text> Only One News</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="checkmark-sharp" size={16} color="gold" />
                <Text> Your news is {selectedNews}</Text>
              </View>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Continue"
                onPress={() => {
                  createOrder();
                }}
              />
            </View>
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    height: 800,
  },
  selectAPlanTocontinue: {
    fontSize: 20,
    margin: 5,
  },
  scrollView: {
    height: 500,
    // borderWidth: 2,
  },
  buttonView: {
    margin: 10,
    paddingTop: 20,
    height: 100,
    // borderWidth: 2,
  },
  scrollViewItems: {
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
    marginLeft: 20,
    marginHorizontal: 20,
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    height: 450,
  },
  planTitle: {
    fontSize: 20,
  },
  planFeatureContainer: {
    marginTop: 30,
  },
});
