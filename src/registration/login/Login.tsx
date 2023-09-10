import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
  Button,
} from 'react-native';
import {CTAButton} from '../../components/CTAButton';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth, {firebase} from '@react-native-firebase/auth';

export const Login = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loginButtonLabel, setLoginButtonLabel] = useState('Login'); // State to manage button label
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State to manage login process

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const goToRegistration = () => {
    nav.push('Register');
  };

  const isValidEmail = (email: any) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: any) => {
    // Password should be at least 8 characters long
    return password.length >= 8;
  };

  const validateInputs = () => {
    let errorMessage = '';

    if (!email) {
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
  const goToMainFlow = async () => {
    // Login Query
    if (validateInputs()) {
      if (email && password) {
        try {
          setLoginButtonLabel('Logging...'); // Change button label
          setIsLoggingIn(true); // Update state to indicate logging in
          const response = await auth().signInWithEmailAndPassword(
            email,
            password,
          );

          if (response.user) {
            nav.replace('Main');
          }
        } catch (e) {
          setLoginButtonLabel('Login'); // Reset button label
          setIsLoggingIn(false); // Reset state after login attempt
          Alert.alert('Alert Password and Email', `${e}`);
        } finally {
          setLoginButtonLabel('Login'); // Reset button label
          setIsLoggingIn(false); // Reset state after login attempt
        }
      }
    }
  };
  const changePassword = () => {
    if (email) {
      firebase
        .auth()
        .sendPasswordResetEmail(`${email}`)
        .then(a => {
          Alert.alert(
            'Password Reset',
            'Password reset link sent to your email ' + `${a}`,
          );
        })
        .catch(e => {
          Alert.alert('Something went wrong', `${e}`);
        });
    } else {
      Alert.alert('Password Reset', 'Please add email to reset passwrod ');
    }
  };

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Login</Text>
          </View>
          <View style={styles.mainContent}>
            <TextInput
              style={styles.loginTextField}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              inputMode="email"
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Text onPress={changePassword}>Forget Paaword</Text>
          </View>
          <CTAButton
            title={loginButtonLabel}
            onPress={goToMainFlow}
            variant="primary"
            disabled={isLoggingIn}
          />
          <CTAButton
            title="Sign Up"
            onPress={goToRegistration}
            variant="secondary"
            disabled={false}
          />
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: 'white',
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
    fontSize: 30,
    fontFamily: 'bold',
    textAlign: 'center',
    fontWeight: '200',
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 40,
    fontSize: 15,
    marginVertical: 10,
    fontWeight: '300',
  },
  mainContent: {
    flex: 6,
  },
});
