import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {NewsNav} from './news/NewsNav';
import AccountNav from './account/AccountNav';
import {View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export const Main: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="News"
        component={NewsNav}
        options={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="My Account"
        component={AccountNav}
        options={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
