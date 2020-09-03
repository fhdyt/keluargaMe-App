import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Title, Caption } from 'react-native-paper';
import { Context } from '../context/AuthContext';
import Spacer from '../components/Spacer';
const SignInScreen =() => {
  const { state, signin, clearErrorMessage } = useContext(Context);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Title style={{alignSelf:'center', fontSize:30, fontWeight:'bold'}}>Masuk</Title>
      <Caption style={{alignSelf:'center'}}>www.keluarga.me</Caption>
      <Spacer />
      <TextInput
      label="No. Handphone"
      value={phone}
      onChangeText={phone => setPhone(phone)}
    />
    <Spacer />
    <TextInput
    selectionColor="#388e3c"
    underlineColor="#388e3c"
      label="Password"
      secureTextEntry
      value={password}
      onChangeText={password => setPassword(password)}
    />
    <Spacer />
    <Button mode="contained" style ={{borderRadius:30}} color="#388e3c" onPress={() => signin({ phone, password })}>
    Masuk
  </Button>
    </View>
  );
}

SignInScreen.navigationOptions = ({ navigation }) => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginHorizontal:10,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignContent:'center'
  },
});

export default SignInScreen;