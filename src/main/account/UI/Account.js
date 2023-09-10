import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
  Text,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Account = ({navigation}) => {
  const logout = async () => {
    await auth().signOut();
    auth().onAuthStateChanged(user => {
      if (!user) {
        // Signed out
        navigation.replace('Login');
      }
    });
  };

  return (
    <SafeAreaView style={styles.contentView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.container1}>
            <Text
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              Profile
            </Text>
          </View>
          <View style={styles.container2}>
            <Text>Settings</Text>
          </View>
          <View style={styles.container3}>
            <View>
              <Text
                onPress={() => {
                  navigation.navigate('Subscriptions');
                }}>
                Subscriptions
              </Text>
            </View>
            <View>
              <Text>Coupons</Text>
            </View>
          </View>
          <View style={styles.signOutContainer}>
            <Text
              onPress={() => {
                Alert.alert('Alert', 'Are you sure to LogOut', [
                  {text: 'Cancel', style: 'cancel'},
                  {text: 'Log out', onPress: () => logout()},
                ]);
              }}
              style={styles.signOutText}>
              SIGN OUT
            </Text>
          </View>
          <Text style={styles.versionText}>Version</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: '#e3dbdbfa',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    textAlign: 'center',
    // justifyContent: 'center',
  },
  container1: {
    margin: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    paddingTop: 10,
  },
  container2: {
    margin: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    paddingTop: 10,
  },
  container3: {
    margin: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    paddingTop: 10,
  },
  signOutContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  signOutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    alignSelf: 'center',
  },
  versionText: {
    alignSelf: 'center',
  },
});

export default Account;
