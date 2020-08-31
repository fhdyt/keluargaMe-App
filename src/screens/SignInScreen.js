import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Context } from '../context/AuthContext';

const SignInScreen =() => {
  const { state, signin, clearErrorMessage } = useContext(Context);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
      label="Email"
      value={phone}
      onChangeText={phone => setPhone(phone)}
    />
    <TextInput
      label="Password"
      value={password}
      onChangeText={password => setPassword(password)}
    />
    <Button mode="contained" onPress={() => signin({ phone, password })}>
    Masuk
  </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    backgroundColor: '#fff',
  },
});

export default SignInScreen;