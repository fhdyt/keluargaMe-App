import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Headline, RadioButton, Switch, ToggleButton } from 'react-native-paper';
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
  
  return (
    <ScrollView>
    <View style={styles.container}>
      <Headline>{header}</Headline>
      <Spacer />
      <View style={{
        flexDirection:'row', 
        justifyContent:'space-between'
      }}>
        
        <Text style={{alignSelf:'center', fontSize:16}}>Suami / Istri</Text>
        <Switch value={tags} color="#6139EE" onValueChange={onToggleSwitch} />
      </View>
      <Spacer />
      <TextInput
        label="Nama"
        value={name}
        onChangeText={name => setName(name)}
    />
    <Spacer />
    <TextInput
        label="Alamat"
        value={address}
        onChangeText={address => setAddress(address)}
    />
    <Spacer />
    <TextInput
        label="No Handphone"
        value={phone}
        onChangeText={phone => setPhone(phone)}
    />
    <Spacer />
    <TextInput
        label="Tanggal Lahir"
        value={birthdate}
        onChangeText={birthdate => setBirthdate(birthdate)}
    />
    <Spacer />
    <TextInput
        label="Tanggal Meninggal"
        value={diedate}
        onChangeText={diedate => setDiedate(diedate)}
    />
    <Spacer />
    <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender}>
              <RadioButton.Item label="Pria" value="M" />
              <RadioButton.Item label="Wanita" value="F" />
            </RadioButton.Group>
    <Spacer />
    <Button mode="contained" style={{borderRadius:30}} color="#388e3c" onPress={() => onSubmit(name, address, phone, birthdate, diedate, gender, tags)}>{buttonTitle}</Button>
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
    marginHorizontal:10,
    backgroundColor: '#fff',
    justifyContent:'space-between'
  },
});

export default MemberForm;