import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Button, Headline, RadioButton, Switch, ToggleButton } from 'react-native-paper';
import Spacer from '../components/Spacer';

const ChangePasswordScreen =({ navigation }) => {
  const [oldpass, setOldpass] = useState('');
  const [newpass, setNewpass] = useState('');
  const [retypepass, setRetypepass] = useState('')
  
  return (
    <ScrollView>
    <View style={styles.container}>
      <Spacer />
      <TextInput
        label="Password Lama"
        mode="outlined"
        value={oldpass}
        onChangeText={oldpass => setOldpass(oldpass)}
    />
    <Spacer />
    <TextInput
        label="Password Baru"
        mode="outlined"
        value={newpass}
        onChangeText={newpass => setNewpass(newpass)}
    />
    <Spacer />
    <TextInput
        label="Ulangi Password Baru"
        mode="outlined"
        value={retypepass}
        onChangeText={retypepass => setRetypepass(retypepass)}
    />
    <Spacer />
    <Button mode="contained" color="#388e3c" style={{borderRadius:30}}>Ganti Password</Button>
    </View>
    </ScrollView>
  );
}

ChangePasswordScreen.navigationOptions = ({ navigation }) => {
    return {
      title : 'Ganti Password',
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

export default ChangePasswordScreen;