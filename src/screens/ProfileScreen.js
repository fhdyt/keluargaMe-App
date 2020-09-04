import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

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
      <Spacer />
      <Button icon="key" style={{borderRadius:30}} mode="contained" color='#388e3c' onPress={() => navigation.navigate('ChangePassword')}>
        Ganti Password
      </Button>
      <Spacer />
      <Button icon="logout" style={{borderRadius:30}} mode="contained" color='#d50000' onPress={() => buttonAlert()}>
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
    marginHorizontal:20,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;