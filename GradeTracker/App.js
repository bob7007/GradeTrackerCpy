import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { config } from '@tamagui/config/v3';
import { Button } from 'tamagui'
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pages/Home';
import DetailsScreen from './pages/Details';

const Stack = createNativeStackNavigator();
const tamaguiConfig = createTamagui(config);

const App = () => {
  return (
    <NavigationContainer>
      <TamaguiProvider config={tamaguiConfig}>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
        </Stack.Navigator>
      </TamaguiProvider>
    </NavigationContainer>

  );
};
export default App;

