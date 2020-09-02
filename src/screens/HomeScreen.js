import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { TextInput, Button, Searchbar, List } from 'react-native-paper';
import { Context as MemberContext } from '../context/MemberContext';

const HomeScreen =({navigation}) => {
  const { state, fetchFamily } = useContext(MemberContext);
 
  useEffect(() => {
    fetchFamily();
  }, []);

  var filter = () => {
    return state.personData.filter(result => {
      return result.pid === '';
    });
  };

  return (
    <View style={styles.container}>
      <Searchbar
          onTouchStart={() => navigation.navigate('Search')}
          placeholder="Cari"
      />
      <Button icon="plus" mode="contained" color='#388e3c' onPress={() => navigation.navigate('AddFirstMember')}>
        Tambah
      </Button>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filter()}
        keyExtractor={(member) => member._id}
        renderItem={({ item }) => {
        return (
          <List.Item
            title={item.name}
            description={item._id}
            onPress={() => navigation.navigate('DetailMember', { item })}
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

export default HomeScreen;