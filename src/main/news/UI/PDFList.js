import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {DatePicker} from '../../../components/DatePicker';

export default PDFList = () => {
  const navigation = useNavigation();
  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };
  // Initial empty array of users // initial newsData
  const [newsData, setNewsData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  // State to hold filtter PDFs
  const [filteredPDFs, setFilteredPDFs] = useState(newsData);

  const bb = () => {
    const fetchDataSubscriber = firestore()
      .collection('NEWS')
      .where('date', '==', selectedDate)
      .onSnapshot(querySnapshot => {
        const newsDATA = [];
        querySnapshot.forEach(documentSnapshot => {
          newsDATA.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
          // console.log(documentSnapshot.data().news);
        });
        setNewsData(newsDATA);
      });
    // Unsubscribe from events when no longer in use
    return () => fetchDataSubscriber();
  };

  //to enable filtter
  const handleFilterPDFs = () => {
    let filteredPDFs = [...newsData];
    if (selectedDate) {
      filteredPDFs = filteredPDFs.filter(pdf => pdf.date === selectedDate);
    }
    setFilteredPDFs(filteredPDFs);
  };

  // Call the filtering function whenever the picker value or date input changes
  useEffect(() => {
    bb();
  }, [selectedDate]);

  const handleOpenPDF = async selectedPDF => {
    try {
      // Pass selected options to PDFViewerScreen
      navigation.navigate('SelectNewsTypes', {selectedNews: selectedPDF});
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  const renderPDFItem = ({item}) => {
    return (
      <Pressable style={styles.pdfItem} onPress={() => handleOpenPDF(item)}>
        <Text style={styles.pdfItemText}>{item.newsName}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filters}>
        <Text>Select Date:</Text>
        <DatePicker comingDate={selectedDate} comingSetDate={setSelectedDate} />

        <Text>Select Language:</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={itemValue => setSelectedLanguage(itemValue)}>
          <Picker.Item label="Select" value="Select" />
          <Picker.Item label="All" value="All" />
          <Picker.Item label="English(en)" value="en" />
          <Picker.Item label="Manipur(bn)" value="bn" />
        </Picker>
      </View>

      <View style={styles.listViews}>
        <FlatList
          data={newsData}
          renderItem={renderPDFItem}
          keyExtractor={item => item.key}
          ListEmptyComponent={<Text>No news found.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  listViews: {
    margin: 8,
  },
  filters: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
  },
  fillterButton: {
    alignSelf: 'center',
    padding: 8,
    marginVertical: 10,
    backgroundColor: 'purple',
    borderRadius: 10,
  },
  fillterText: {
    color: 'white',
  },
  pdfItem: {
    padding: 5,
    margin: 3,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: 'gray',
    borderRadius: 10,
  },
  pdfItemText: {
    padding: 4,
    fontSize: 16,
    color: 'blue',
  },
});
