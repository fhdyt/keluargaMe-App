import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import { Context as MemberContext } from '../context/MemberContext';

const AddMemberScreen =({ navigation }) => {
  const { state, add_member } = useContext(MemberContext);
  const _id = navigation.state.params._id
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [diedate, setDiedate] = useState('');
  return (
    <View style={styles.container}>
      <Headline>Tambah Anggota</Headline>
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
    <Button onPress={() => {add_member({ _id, name, address, phone, birthdate, diedate })}}>Simpan</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    backgroundColor: '#fff',
  },
});

export default AddMemberScreen;