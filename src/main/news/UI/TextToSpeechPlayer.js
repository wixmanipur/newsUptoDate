import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  Pressable,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Tts from 'react-native-tts';

const TextToSpeechPlayer = ({route, navigation}) => {
  const {topic, photo, body, title} = route.params;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Update the header title based on the selectedNews value
    navigation.setOptions({
      title: title, // Replace 'title' with the appropriate property from selectedNews
    });
    // Initialize TTS and set default language
    Tts.setDefaultLanguage('bn-BD');
    return () => {
      // Cleanup TTS when component unmounts
      Tts.stop();
    };
  }, []);

  const speak = itemToRead => {
    if (!isSpeaking) {
      setIsSpeaking(true);
      const options = {
        androidParams: {
          KEY_PARAM_PAN: 0,
          KEY_PARAM_VOLUME: 0.8,
          KEY_PARAM_LANGUAGE: 'bn-BD',
        },
      };
      Tts.speak(itemToRead, options, () => {
        setIsSpeaking(false);
      });
    }
  };

  const pause = () => {
    Tts.pause();
  };

  const stop = () => {
    Tts.stop();
    setIsSpeaking(false);
  };

  const resume = () => {
    Tts.resume();
  };

  const newsTypes = ['Related', 'World', 'National', 'State', 'Sport'];

  return (
    <SafeAreaView>
      <View style={{height: 40}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}>
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

      <View style={{height: 470}}>
        <ScrollView style={styles.container}>
          <Text style={styles.topic}>{topic}</Text>
          {photo ? (
            <Image
              style={styles.photo}
              source={{
                uri: photo,
              }}
            />
          ) : (
            <Text>no photo..</Text>
          )}
          <Text style={styles.text}>{body}</Text>
        </ScrollView>
      </View>

      <View style={{height: 50}}>
        <View style={styles.buttonContainer}>
          <Button
            color="#f194ff"
            title="Read Topic"
            onPress={() => speak(topic)}
            disabled={isSpeaking}
          />
          <Button
            color="#f194ff"
            title="Read Text"
            onPress={() => speak(body)}
            disabled={isSpeaking}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Pause" onPress={pause} disabled={!isSpeaking} />
          <Button title="Stop" onPress={stop} disabled={!isSpeaking} />
          <Button title="Resume" onPress={resume} disabled={isSpeaking} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
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
  topic: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  photo: {
    width: 50,
    height: 40,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default TextToSpeechPlayer;
