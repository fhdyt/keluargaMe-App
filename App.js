import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as MemberProvider } from './src/context/MemberContext';
import { Provider as JournalProvider } from './src/context/JournalContext';
import { IconButton } from 'react-native-paper';

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import AddMemberScreen from './src/screens/AddMemberScreen';
import EditMemberScreen from './src/screens/EditMemberScreen';
import AddFirstMemberScreen from './src/screens/AddFirstMemberScreen';
import DetailMemberScreen from './src/screens/DetailMemberScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
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
    },
    {
      defaultNavigationOptions: {
        cardStyle: { backgroundColor: '#FFFFFF' },
        backgroundColor:'white',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'transparent'
        },
      },
  }),
    navigationOptions: {
      tabBarLabel:() => {return null},
      tabBarIcon: ({ tintColor }) => (
        <IconButton icon="home" color={ tintColor } size={30} />
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
    },
    {
      defaultNavigationOptions: {
        cardStyle: { backgroundColor: '#FFFFFF' },
        backgroundColor:'white',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'transparent'
        },
      },
  }),
    navigationOptions: {
      tabBarLabel:() => {return null},
      tabBarIcon: ({ tintColor }) => (
        <IconButton icon="book-open-page-variant" color={ tintColor } size={30} />
      )
    }
};

const profileFlow = 
  { 
    screen : createStackNavigator({
      Profile : ProfileScreen,
      ChangePassword : ChangePasswordScreen,
    },
    {
      defaultNavigationOptions: {
        cardStyle: { backgroundColor: '#FFFFFF' },
        backgroundColor:'white',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'transparent'
        },
      },
  }),
    navigationOptions: {
      tabBarLabel:() => {return null},
      tabBarIcon: ({ tintColor }) => (
        <IconButton icon="account" color={ tintColor } size={30} />
      )
    }
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: '#FFFFFF' },
      backgroundColor:'white',
      headerStyle: {
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        backgroundColor: 'transparent'
      },
    },
  }),
  mainFlow: createBottomTabNavigator({
    homeFlow,
    Search: {
      screen : SearchScreen,
      navigationOptions: {
        tabBarLabel:() => {return null},
        tabBarIcon: ({ tintColor }) => (
          <IconButton icon="magnify" color={ tintColor } size={30} />
        )
    }
    },
    journalFlow,
    profileFlow
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