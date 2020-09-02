import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
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
        <SafeAreaView forceInset={{ top: 'always' }}>
      <Button icon="plus" mode="contained" color='#388e3c' onPress={() => buttonAlert()}>
        Keluar
      </Button>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;