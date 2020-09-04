import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Headline, RadioButton, Switch, ToggleButton, Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Spacer from './Spacer';


const MemberForm =({ onSubmit, initialValues, buttonTitle, header }) => {
  const [name, setName] = useState(initialValues.name);
  const [address, setAddress] = useState(initialValues.address);
  const [phone, setPhone] = useState(initialValues.phone);
  const [birthdate, setBirthdate] = useState(initialValues.birthdate);
  const [diedate, setDiedate] = useState(initialValues.diedate);
  const [gender, setGender] = useState(initialValues.gender);

  const [tags, setTags] = useState(initialValues.tags);
  const onToggleSwitch = () => setTags(!tags);
  
  const [loadingButton, setLoadingButton] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)

  return (
    <ScrollView>
    <View style={styles.container}>
      <Headline>{header}</Headline>
      <Spacer />
      <View style={{
        flexDirection:'row', 
        justifyContent:'space-between',
        borderWidth:1, 
        borderColor:"grey",
        borderRadius: 4,
        backgroundColor: '#F6F6F6',
        padding: 10
      }}>
        
        <Text style={{alignSelf:'center', fontSize:16, color:'#858585'}}>Suami / Istri</Text>
        <Switch value={tags} color="#388e3c" onValueChange={onToggleSwitch} />
      </View>
      <Spacer />
      <TextInput
        label="Nama"
        mode="outlined"
        value={name}
        onChangeText={name => setName(name)}
    />
    <Spacer />
    <TextInput
        label="Alamat"
        mode="outlined"
        value={address}
        onChangeText={address => setAddress(address)}
    />
    <Spacer />
    <TextInput
        label="No Handphone"
        mode="outlined"
        value={phone}
        onChangeText={phone => setPhone(phone)}
    />
    <Spacer />
    <TextInput
        label="Tanggal Lahir"
        mode="outlined"
        value={birthdate}
        onChangeText={birthdate => setBirthdate(birthdate)}
    />
    <Spacer />
    <TextInput
        label="Tanggal Meninggal"
        mode="outlined"
        value={diedate}
        onChangeText={diedate => setDiedate(diedate)}
    />
    <Spacer />
    <View style={{
      borderWidth:1, 
      borderColor:"grey",
      borderRadius: 4,
      backgroundColor: '#F6F6F6',
      padding: 5
    }}>
    <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender}>
              <RadioButton.Item label="Pria" color="#388e3c" value="M" />
              <RadioButton.Item label="Wanita" color="#388e3c" value="F" />
            </RadioButton.Group>
    </View>
    <Spacer />
    <Button mode="contained" 
      loading={loadingButton}
      disabled={disabledButton}
      style={{borderRadius:30}} 
      color="#388e3c" 
      onPress={() => {
        setLoadingButton(true);
        setDisabledButton(true);
        onSubmit(name, address, phone, birthdate, diedate, gender, tags)
      }
    }>{buttonTitle}</Button>
    </View>
    </ScrollView>
  );
}

MemberForm.defaultProps = {
    initialValues: {
      name: '',
      address: '',
      phoe: '',
      birthdate: '',
      diedate: '',
      gender: 'M',
      tags: false
    }
  };

const styles = StyleSheet.create({
  container: {
    marginHorizontal:20,
    marginBottom:10,
    backgroundColor: '#fff',
    justifyContent:'space-between'
  },
});

export default MemberForm;