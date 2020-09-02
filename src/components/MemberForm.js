import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Headline, RadioButton, Switch, ToggleButton } from 'react-native-paper';


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
    <View style={styles.container}>
      <Headline>{header}</Headline>
      <Text style={{alignSelf:'center', fontSize:16}}>Suami / Istri</Text>
            <Switch value={tags} color="#6139EE" onValueChange={onToggleSwitch} />
      <TextInput
        label="Nama"
        value={name}
        onChangeText={name => setName(name)}
    />
    <TextInput
        label="Alamat"
        value={address}
        onChangeText={address => setAddress(address)}
    />
    <TextInput
        label="No Handphone"
        value={phone}
        onChangeText={phone => setPhone(phone)}
    />
    <TextInput
        label="Tanggal Lahir"
        value={birthdate}
        onChangeText={birthdate => setBirthdate(birthdate)}
    />
    <TextInput
        label="Tanggal Meninggal"
        value={diedate}
        onChangeText={diedate => setDiedate(diedate)}
    />
    <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender}>
              <RadioButton.Item label="Pria" value="M" />
              <RadioButton.Item label="Wanita" value="F" />
            </RadioButton.Group>
    <Button onPress={() => onSubmit(name, address, phone, birthdate, diedate, gender, tags)}>{buttonTitle}</Button>
    </View>
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
  },
});

export default MemberForm;