import {View, Text, StyleSheet, Button, Alert, TextInput} from 'react-native';
import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SelectNewsTypes} from './UI/SelectNewsTypes';
import PDFListScreen from './UI/PDFList';
import TextToSpeechPlayer from './UI/TextToSpeechPlayer';
// import {useNavigation} from '@react-navigation/native';
// import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
// import AccountNav from '../account/AccountNav';

const Stack = createNativeStackNavigator();

interface Response {
  navigation: any;
}

export const NewsNav: FC<Response> = ({navigation}) => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="News"
        component={PDFListScreen}
        options={{
          headerShown: true,
        }}
      /> */}
      <Stack.Screen
        name="SelectNewsTypes"
        component={SelectNewsTypes}
        options={{
          headerShown: true,
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
      <Stack.Screen
        name="TextToSpeechPlayer"
        component={TextToSpeechPlayer}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
