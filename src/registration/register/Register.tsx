import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {CTAButton} from '../../components/CTAButton';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const Register = () => {
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [news, setNews] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  // State to manage button label
  const [signUpButtonLabel, setSignUpButtonLabel] = useState('Sign up');
  // State to manage login process
  const [isSigningUp, setIsSigningUp] = useState(false);

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const createProfile = async (response: any) => {
    // Create Profile Query Here
    database()
      .ref(`/users/${response.user.uid}`)
      .set({name, gender, phoneNumber, address})
      .then(onfulfilled => {
        console.log('onfulfilled..', onfulfilled);
      })
      .catch(e => {
        Alert.alert('Error', `${e}`);
      });
    // Create Subscriber
    database()
      .ref(`/subscriber/${response.user.uid}`)
      .set({news})
      .then(onfulfilled => {
        console.log('onfulfilled..', onfulfilled);
      })
      .catch(e => {
        Alert.alert('Error', `${e}`);
      });
  };

  const isValidEmail = (email: any) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: any) => {
    // Basic phone number validation
    return /^\d{10}$/.test(phoneNumber); // Assuming 10-digit phone number
  };

  const isValidPassword = (password: any) => {
    // Password should be at least 8 characters long
    return password.length >= 8;
  };

  const validateInputs = () => {
    let errorMessage = '';

    if (!news) {
      errorMessage = 'News is required';
    } else if (!name) {
      errorMessage = 'Name is required';
    } else if (!gender) {
      errorMessage = 'Gender is required';
    } else if (!phoneNumber) {
      errorMessage = 'Phone number is required';
    } else if (!isValidPhoneNumber(phoneNumber)) {
      errorMessage = 'Invalid phone number';
    } else if (!email) {
      errorMessage = 'Email is required';
    } else if (!isValidEmail(email)) {
      errorMessage = 'Invalid email format';
    } else if (!password) {
      errorMessage = 'Password is required';
    } else if (!isValidPassword(password)) {
      errorMessage = 'Password must be at least 8 characters long';
    }
    if (errorMessage) {
      Alert.alert('Validation Error', `${errorMessage}`);
      return false;
    }
    return true;
  };

  const registerAndGoToSelectPlans = async () => {
    // Register User Query Here
    if (validateInputs()) {
      if (email && password) {
        try {
          setIsSigningUp(true);
          setSignUpButtonLabel('Signing...');
          const response = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );

          if (response.user) {
            await createProfile(response);
            nav.replace('Main');
          }
        } catch (e) {
          setSignUpButtonLabel('Sign up');
          setIsSigningUp(false);
          Alert.alert('Something went wrong', `${e}`, [
            {text: 'Go back', onPress: () => nav.navigate('Login')},
          ]);
        } finally {
          setIsSigningUp(false);
          setSignUpButtonLabel('Sign up');
        }
      }
    }
  };

  return (
    <ScrollView
      style={styles.contentView}
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled">
      <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.contentView}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Register</Text>
            </View>
            <View style={styles.mainContent}>
              <Text>Select your News</Text>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  height: 50,
                }}>
                <Picker
                  selectedValue={news}
                  onValueChange={itemValue => setNews(itemValue)}>
                  <Picker.Item label="Select" value="" />
                  <Picker.Item label="Hueiyen Lanpao" value="Hueiyen Lanpao" />
                  <Picker.Item label="Poknapham" value="Poknapham" />
                  <Picker.Item label="Echel Express" value="Echel Express" />
                  <Picker.Item
                    label="The Sangai Express"
                    value="The Sangai Express"
                  />
                </Picker>
              </View>

              <TextInput
                style={styles.loginTextField}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <Text>Gender</Text>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  height: 50,
                }}>
                <Picker
                  selectedValue={gender}
                  onValueChange={itemValue => setGender(itemValue)}>
                  <Picker.Item label="Select" value="" />
                  <Picker.Item label="MALE" value="MALE" />
                  <Picker.Item label="FEMALE" value="FEMALE" />
                </Picker>
              </View>
              <TextInput
                style={styles.loginTextField}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
              <TextInput
                style={styles.loginTextField}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.loginTextField}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                inputMode="email"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.loginTextField}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <CTAButton
              title={signUpButtonLabel}
              onPress={registerAndGoToSelectPlans}
              variant="primary"
              disabled={isSigningUp}
            />
            <CTAButton
              title="Go Back"
              onPress={nav.goBack}
              variant="secondary"
              disabled={false}
            />
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
    marginHorizontal: 40,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  titleContainer: {
    flex: 1.2,
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'bold',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '200',
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 40,
    fontSize: 15,
    marginVertical: 5,
    fontWeight: '300',
  },
  mainContent: {
    flex: 6,
  },
});
