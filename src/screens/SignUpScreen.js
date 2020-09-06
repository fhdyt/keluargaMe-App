import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { TextInput, Button, Title, Caption, Paragraph } from 'react-native-paper';
import { Context } from '../context/MemberContext';
import Spacer from '../components/Spacer';
import axios from 'axios';

const SignUpScreen =({navigation}) => {
const { state, signin, clearErrorMessage, fetchFamily } = useContext(Context);

  useEffect(() => {
    axios.get('https://guarded-plains-47822.herokuapp.com/person', {
      headers: { 'content-type': 'application/json' }
    })
      .then(res => {
        alert(res)
        const categories = res.data;
        console.log("Sukses");
      })
      .catch(function (response) {
        console.log(response)
        alert(response.message)
      })
  }, []);

  return (
    <View style={styles.container}>
      <Image style={{width:100, height:100, alignSelf:'center'}} source={require('../../assets/logo.png')} />
      <Title style={{alignSelf:'center', fontSize:30, fontWeight:'bold', color:"#388e3c"}}>KeluargaMe</Title>
      <Caption style={{alignSelf:'center'}}>www.keluarga.me</Caption>
      <Spacer />
      <Paragraph style={{textAlign: 'center'}}>KeluargaMe adalah aplikasi pendata keluarga besar anda mulai dari keturunan pertama hingga keturunan berikutnya. Anda juga dapat melihat silsilah keluarga anda dalam bentuk 'Pohon Keluarga'</Paragraph>
      <Spacer />
    
    <Spacer />
    <Button 
    icon="web"
    mode="contained" 
    style ={{borderRadius:30}} 
    color="#0091ea" 
    >
    Selengkapnya
    </Button>
    <Spacer />
    <Button 
    icon="whatsapp"
    mode="contained" 
    style ={{borderRadius:30}} 
    color="#388e3c" 
    onPress={() => Linking.openURL('whatsapp://send?text=Halo, saya terarik dengan aplikasi KeluargaMe, saya ingin mendaftarkan diri. Terima kasih&phone=6282387002766')}
    >
    Hubungin Kami
  </Button>
    </View>
  );
}

SignUpScreen.navigationOptions = ({ navigation }) => {
  return {
    title : '',
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    }      
    }
   
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    marginHorizontal:20,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignContent:'center'
  },
});

export default SignUpScreen;