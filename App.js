import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as MemberProvider } from './src/context/MemberContext';
import { Provider as JournalProvider } from './src/context/JournalContext';

import SignInScreen from './src/screens/SignInScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import AddMemberScreen from './src/screens/AddMemberScreen';
import EditMemberScreen from './src/screens/EditMemberScreen';
import AddFirstMemberScreen from './src/screens/AddFirstMemberScreen';
import DetailMemberScreen from './src/screens/DetailMemberScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import JournalScreen from './src/screens/JournalScreen';
import AddJournalScreen from './src/screens/AddJournalScreen';
import DetailJournalScreen from './src/screens/DetailJournalScreen';
import EditJournalScreen from './src/screens/EditJournalScreen';
import { setNavigator } from './src/navigationRef';

import { AntDesign, FontAwesome } from '@expo/vector-icons';

const homeFlow = 
  { 
    screen : createStackNavigator({
      Home : HomeScreen,
      AddMember : AddMemberScreen,
      EditMember : EditMemberScreen,
      AddFirstMember : AddFirstMemberScreen,
      DetailMember : DetailMemberScreen
    }),
    navigationOptions: {
      tabBarLabel:() => {return null},
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="home" color={ tintColor } size={30} />
      )
    }
};

const journalFlow = 
  { 
    screen : createStackNavigator({
      Journal : JournalScreen,
      AddJournal : AddJournalScreen,
      EditJournal : EditJournalScreen,
      DetailJournal : DetailJournalScreen
    }),
    navigationOptions: {
      tabBarLabel:() => {return null},
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="book" color={ tintColor } size={30} />
      )
    }
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SignInScreen,
  }),
  mainFlow: createBottomTabNavigator({
    homeFlow,
    Search: {
      screen : SearchScreen,
      navigationOptions: {
        tabBarLabel:() => {return null},
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="search1" color={ tintColor } size={30} />
        )
    }
    },
    journalFlow,
    Profile: {
      screen : ProfileScreen,
      navigationOptions: {
        tabBarLabel:() => {return null},
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="user" color={ tintColor } size={30} />
        )
    }
  }
  },
  {
    tabBarOptions: {
        activeTintColor: '#388e3c', 
        inactiveTintColor: 'grey'
    }
}),
})

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <JournalProvider>
      <MemberProvider>
        <AuthProvider>
          <App 
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </MemberProvider>
    </JournalProvider>
  );
};