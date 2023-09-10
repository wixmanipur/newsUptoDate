import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Pressable,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Profile = () => {
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();

  //display user id
  useEffect(() => {
    const userData = auth().currentUser;
    setEmail(userData?.email?.toString());
    const onValueChange = database()
      .ref(`/users/${userData?.uid}`)
      .once('value')
      .then(snapshot => {
        const userDATA = snapshot.val();
        setName(userDATA.name);
        setGender(userDATA.gender);
        setPhoneNumber(userDATA.phoneNumber);
      });
  }, []);

  return (
    <ScrollView
      style={styles.contentView}
      contentContainerStyle={styles.scrollViewContent}>
      <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.contentView}>
          <View style={styles.container}>
            <View style={styles.mainContent}>
              <Text>Name</Text>
              <TextInput
                style={styles.loginTextField}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <Text>Gender</Text>
              <TextInput
                style={styles.loginTextField}
                placeholder="Phone Number"
                value={gender}
                onChangeText={setGender}
                keyboardType="phone-pad"
              />
              <Text>Phone Number</Text>
              <TextInput
                style={styles.loginTextField}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              <Text>Emai</Text>
              <TextInput
                style={styles.loginTextField}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                inputMode="email"
                autoCapitalize="none"
              />
            </View>
          </View>
        </SafeAreaView>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 50,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  titleContainer: {
    flex: 1.2,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 45,
    textAlign: 'center',
    fontWeight: '200',
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 40,
    fontSize: 15,
    marginVertical: 15,
    fontWeight: '300',
  },
  mainContent: {
    flex: 6,
  },
});

export default Profile;
