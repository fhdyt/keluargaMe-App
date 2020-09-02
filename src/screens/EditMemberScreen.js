import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Context as MemberContext } from '../context/MemberContext';
import MemberForm from '../components/MemberForm';
const EditMemberScreen =({ navigation }) => {
  const item = navigation.state.params.item

  const _id = item._id;
  const pid = item.pid;

  const { edit_member } = useContext(MemberContext);
  console.log(item.tags[0])
  if(item.tags[0] === 'assistant'){
    tags = true
  }
  else{
    tags = false
  }
  return (
    <MemberForm
    buttonTitle="Edit"
    header="Edit Anggota"
    initialValues={{ 
        name: item.name, 
        address: item.address,
        phone: item.phone,
        birthdate: item.birthdate,
        diedate: item.diedate,
        gender: item.gender,
        tags: tags
    }}
    onSubmit={(name, address, phone, birthdate, diedate, gender, tags) => {
      edit_member({_id, pid, name, address, phone, birthdate, diedate, gender, tags_status:tags}, () => navigation.navigate('DetailMember'));
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

export default EditMemberScreen;