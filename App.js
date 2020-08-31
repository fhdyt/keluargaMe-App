import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as MemberProvider } from './src/context/MemberContext';

import SignInScreen from './src/screens/SignInScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import AddMemberScreen from './src/screens/AddMemberScreen';
import DetailMemberScreen from './src/screens/DetailMemberScreen';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SignInScreen,
  }),
  mainFlow: createStackNavigator({
    Home : HomeScreen,
    Search: SearchScreen,
    AddMember : AddMemberScreen,
    DetailMember : DetailMemberScreen
  })
})

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <MemberProvider>
      <AuthProvider>
        <App 
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </AuthProvider>
    </MemberProvider>
  );
};