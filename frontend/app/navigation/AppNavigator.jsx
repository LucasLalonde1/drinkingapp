import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import IndexScreen from '../screens/IndexScreen';
import EditUserScreen from '../screens/EditUserScreen';
import LobbyScreen from '../screens/LobbyScreen';
import HostGameScreen from '../screens/HostGameScreen';
import LobbyPlusScreen from '../screens/LobbyPlusScreen';
import GameScreen from '../screens/GameScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Index" component={IndexScreen} />
      <Stack.Screen name="EditUser" component={EditUserScreen} />
      <Stack.Screen name="Lobby" component={LobbyScreen} />
      <Stack.Screen name="HostGame" component={HostGameScreen} />
      <Stack.Screen name="LobbyPlus" component={LobbyPlusScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
