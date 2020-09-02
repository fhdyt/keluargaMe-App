import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { TextInput, Button, Headline, List, Title } from 'react-native-paper';
import { Context as MemberContext } from '../context/MemberContext';

const DetailFamilyScreen =({navigation}) => {
    const { state, deleteMember } = useContext(MemberContext)

    const item = navigation.state.params.item

    var members = _id => {
        return state.personData.filter(result => {
          return result.pid === _id;
        });
      };

      const buttonAlert = (_id) =>
    {
        Alert.alert(
        "Peringatan !",
        "Menghapus berarti menghapus semua keluarga pada anggota ini",
        [
            {
            text: "Batal",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "Hapus", onPress: () => {deleteMember(_id, () => {navigation.navigate('DetailMember')})} }
        ],
            { cancelable: false }
        );
    }

    var detailMember = state.personData.find(p => p._id === item._id);

  return (
    <View style={styles.container}>
      <Title>{item.name}</Title>
      <Title>{item.address}</Title>
      <Title>{item.birthdate}</Title>
      <Title>{item.diedate}</Title>
      <Title>{item.gender}</Title>
      <Title>{item.tags}</Title>
      <Button icon="plus" mode="contained" onPress={() => navigation.navigate('AddMember', {item})}>Tambah</Button>
      <Button icon="plus" mode="contained" onPress={() => navigation.navigate('EditMember', {item})}>Edit</Button>
      <Button icon="trash-can" mode="contained" onPress={() => buttonAlert(item._id)}>Hapus</Button>
      <FlatList
            showsVerticalScrollIndicator={false}
            data={members(item._id)}
            keyExtractor={(member) => member._id}
            renderItem={({ item }) => {
            return (
                <List.Item
                title={item.name}
                description={item._id}
                onPress={() => navigation.push('DetailMember', { item })}
                />
            );
            }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    backgroundColor: '#fff',
  },
});

export default DetailFamilyScreen;