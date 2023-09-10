import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import {DatePicker} from '../../../components/DatePicker';

export const SelectNewsTypes = ({navigation}) => {
  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };
  const [selectedDate, setSelectedDate] = useState('');

  const [newsData, setNewsData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [filteredNewsData, setFilteredNewsData] = useState(newsData);

  //to enable filtter
  const handleFilterNewsData = () => {
    const fetchDataSubscriber = firestore()
      .collection('news')
      .onSnapshot(querySnapshot => {
        const newsDATA = [];
        querySnapshot.forEach(documentSnapshot => {
          newsDATA.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.data().key,
          });
        });
        setNewsData(newsDATA);
      });
    // Unsubscribe from events when no longer in use
    return () => fetchDataSubscriber();
  };

  // Replace 'title' with the appropriate property from selectedNews
  useEffect(() => {
    navigation.setOptions({
      title: 'The Skyline Chronicle',
    });
  });

  // Call the filtering function whenever the picker value or date input changes
  useEffect(() => {
    handleFilterNewsData();
    // Call the filtering function whenever the picker value or date input changes
    handleFilterNews();
  }, [newsData, filter]);

  // Filter the news based on the filter criteria
  const handleFilterNews = () => {
    let setNews = [...newsData];
    if (filter !== 'All') {
      setNews = setNews.filter(news => news.newsTypes === filter);
    }
    setFilteredNewsData(setNews);
  };

  const readOut = item => {
    try {
      // Pass selected options to PDFViewerScreen
      navigation.navigate('TextToSpeechPlayer', {
        topic: item.topic,
        photo: item.photo,
        body: item.body,
        title: item.newsName,
      });
    } catch (error) {
      console.error('Error opening Topic:', error);
    }
  };

  const renderNewsItem = ({item}) => {
    return (
      <Pressable style={styles.newsItem} onPress={() => readOut(item)}>
        <Text style={styles.topic}>{item.topic}</Text>
        {item.photo ? (
          <Image
            style={styles.photo}
            source={{
              uri: item.photo,
            }}
          />
        ) : (
          <Text>no photo..</Text>
        )}
        <Text style={styles.text}>{item.shortNote}</Text>
        <Text>source: {item.newsName}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text>Date: {item.date}</Text>
          <Text>lng: {item.language}</Text>
        </View>
      </Pressable>
    );
  };

  const newsTypes = ['All', 'World', 'National', 'State', 'Sport'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 40}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}>
          <View style={{height: 36}}>
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </View>

          {newsTypes.map((type, index) => (
            <Pressable
              key={index}
              style={[
                styles.filterButton,
                {
                  backgroundColor: filter === type ? 'blue' : 'white',
                  Height: 5, // Set a fixed minimum height
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                },
              ]}
              onPress={() => setFilter(type)}>
              <Text style={{color: filter === type ? 'white' : 'black'}}>
                {type}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredNewsData}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>No items found.</Text>}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make sure the container takes up the whole screen
  },
  filterContainer: {
    height: 2,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  filterButton: {
    height: 28,
    paddingHorizontal: 25,
    marginHorizontal: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'blue',
  },
  newsItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    margin: 8,
    borderRadius: 6,
  },
  topic: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
  photo: {
    width: 50,
    height: 40,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    margin: 5,
    borderRadius: 6,
  },
});
