import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Context as MemberContext } from '../context/MemberContext';
import MemberForm from '../components/MemberForm';
const AddMemberScreen =({ navigation }) => {
  const item = navigation.state.params.item
  const pid = item._id;
  const { add_member } = useContext(MemberContext);

  return (
    <MemberForm
    buttonTitle="Simpan"
    header="Tambah Anggota"
    onSubmit={(name, address, phone, birthdate, diedate, gender, tags) => {
      add_member({pid, name, address, phone, birthdate, diedate, gender, tags}, () => navigation.navigate('DetailMember', { item:item }));
    }}
    />
  );
}

AddMemberScreen.navigationOptions = ({ navigation }) => {
  const item = navigation.state.params.item
  return {
    title : item.name,
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

export default AddMemberScreen;