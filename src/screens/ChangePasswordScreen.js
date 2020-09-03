import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Button, Headline, RadioButton, Switch, ToggleButton } from 'react-native-paper';


const ChangePasswordScreen =({ navigation }) => {
  const [oldpass, setOldpass] = useState('');
  const [newpass, setNewpass] = useState('');
  const [retypepass, setRetypepass] = useState('')
  
  return (
    <ScrollView>
    <View style={styles.container}>
      <TextInput
        label="Password Lama"
        value={oldpass}
        onChangeText={oldpass => setOldpass(oldpass)}
    />
    <TextInput
        label="Password Baru"
        value={newpass}
        onChangeText={newpass => setNewpass(newpass)}
    />
    <TextInput
        label="Ulangi Password Baru"
        value={retypepass}
        onChangeText={retypepass => setRetypepass(retypepass)}
    />
    <Button mode="contained" style={{borderRadius:30}}>Ganti Password</Button>
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
    marginHorizontal:10,
    backgroundColor: '#fff',
  },
});

export default ChangePasswordScreen;