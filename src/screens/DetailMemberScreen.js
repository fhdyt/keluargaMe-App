import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { TextInput, Button, Headline, List, Title } from 'react-native-paper';
import { Context as MemberContext } from '../context/MemberContext';

const DetailFamilyScreen =({navigation}) => {
    const { state, deleteMember } = useContext(MemberContext)

    const _id = navigation.state.params._id

    var detailMember = state.personData.find(p => p._id === _id);

    var members = _id => {
        return state.personData.filter(result => {
          return result.pid === _id;
        });
      };

  return (
    <View style={styles.container}>
      <Headline>Detail Member</Headline>
      <Title>{detailMember.name}</Title>
      <Title>{detailMember.address}</Title>
      <Title>{detailMember.birthdate}</Title>
      <Title>{detailMember.diedate}</Title>
      <Button icon="plus" mode="contained" onPress={() => navigation.navigate('AddMember', {_id:_id})}>Tambah</Button>
      <FlatList
            showsVerticalScrollIndicator={false}
            data={members(_id)}
            keyExtractor={(member) => member._id}
            renderItem={({ item }) => {
            return (
                <List.Item
                title={item.name}
                description={item._id}
                onPress={() => navigation.push('DetailMember', { _id:item._id })}
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