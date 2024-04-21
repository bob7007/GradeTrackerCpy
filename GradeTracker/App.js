import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { config } from '@tamagui/config/v3';
import HomeScreen from './pages/Home';
import DetailsScreen from './pages/Details';

const Drawer = createDrawerNavigator();
const tamaguiConfig = createTamagui(config);

const App = () => {
  return (
    <NavigationContainer>
      <TamaguiProvider config={tamaguiConfig}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Details" component={DetailsScreen} />
        </Drawer.Navigator>
      </TamaguiProvider>
    </NavigationContainer>
  );
};

export default App;
