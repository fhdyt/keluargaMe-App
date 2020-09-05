import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, Button, Title, Caption, Subheading, Banner } from 'react-native-paper';
import { Context } from '../context/AuthContext';
import Spacer from '../components/Spacer';

const SignInScreen =({navigation}) => {
  const { state, signin, loginError, loading } = useContext(Context);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
    <View style={styles.container}>
      <Image style={{width:100, height:100, alignSelf:'center'}} source={require('../../assets/logo.png')} />
      <Title style={{alignSelf:'center', fontSize:30, fontWeight:'bold'}}>Masuk</Title>
      <Caption style={{alignSelf:'center'}}>www.keluarga.me</Caption>
      <Banner
        style={{backgroundColor:'#d50000'}}
        visible={state.loginError}
        actions={[ ]}>
        <Text style={{color:'white', fontSize:15}}>Gagal</Text>
      </Banner>
    <Spacer />
      <TextInput
      label="Nomor Handphone"
      mode="outlined"
      value={phone}
      onChangeText={phone => setPhone(phone)}
    />
    <Spacer />
    <TextInput
      label="Password"
      mode="outlined"
      secureTextEntry
      value={password}
      onChangeText={password => setPassword(password)}
    />
    <Spacer />
    <Button 
    loading={state.loading}
    disabled={state.loading}
    mode="contained" 
    style ={{borderRadius:30}} 
    color="#388e3c" 
    onPress={() => {
      loading();
      signin({ phone, password });
      }}>
    Masuk
  </Button>
  <Spacer />
  <Subheading style={{alignSelf:'center', color:"grey"}} onPress={()=> navigation.navigate('SignUp')}>Cara mendapatkan akun</Subheading>
  <Caption style={{alignSelf:'center', fontSize:11}}>Versi. 3</Caption>
    </View>
    </>
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