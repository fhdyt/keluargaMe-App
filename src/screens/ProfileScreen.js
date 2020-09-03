import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import DetailJournalScreen from './DetailJournalScreen';

const ProfileScreen =({navigation}) => {

  const { signout } = useContext(AuthContext);
  const buttonAlert = () =>
    {
        Alert.alert(
        "",
        "Anda yakin keluar ?",
        [
            {
            text: "Batal",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "Keluar", onPress: signout }
        ],
            { cancelable: false }
        );
    }
  return (
    <View style={styles.container}>
      <Button icon="plus" style={{borderRadius:30}} mode="contained" color='#388e3c' onPress={() => navigation.navigate('ChangePassword')}>
        Ganti Password
      </Button>
      <Button icon="plus" mode="contained" color='#388e3c' onPress={() => buttonAlert()}>
        Keluar
      </Button>
    </View>
  );
}


ProfileScreen.navigationOptions = ({ navigation }) => {
  return {
    title : 'Profile',
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    }
      
    }
   
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;