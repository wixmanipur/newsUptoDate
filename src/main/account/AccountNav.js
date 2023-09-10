import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Account from './UI/Account';
import Profile from './UI/Profile/Profile';
import {SelectPlans} from '../../plans/SelectPlans';

const Stack = createNativeStackNavigator();

export default NewsNav = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerRight: () => (
            <View>
              <Icon
                name="ellipsis-vertical"
                size={30}
                color={'red'}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Subscriptions" component={SelectPlans} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
