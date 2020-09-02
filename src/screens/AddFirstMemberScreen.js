import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Context as MemberContext } from '../context/MemberContext';
import MemberForm from '../components/MemberForm';
const AddFirstMemberScreen =() => {
  const pid = '';
  const { add_member } = useContext(MemberContext);

  return (
    <MemberForm
    buttonTitle="Simpan"
    header="Tambah Anggota"
    onSubmit={(name, address, phone, birthdate, diedate, gender, tags) => {
      add_member({pid, name, address, phone, birthdate, diedate, gender, tags}, () => navigation.navigate('Home'));
    }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    backgroundColor: '#fff',
  },
});

export default AddFirstMemberScreen;