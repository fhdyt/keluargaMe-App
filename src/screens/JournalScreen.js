import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Headline, List } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { Context as JournalContext } from '../context/JournalContext';

const JournalScreen =({navigation}) => {

  const { state, fetchJournal } = useContext(JournalContext);
 
  useEffect(() => {
    fetchJournal();
  }, []);

  return (
    <View style={styles.container}>
        <SafeAreaView forceInset={{ top: 'always' }}>
      <Headline>Jurnal Keluarga</Headline>
      <Button icon="plus" mode="contained" color='#388e3c' onPress={() => navigation.navigate('AddJournal')}>
        Tambah
      </Button>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={state.journalData}
        keyExtractor={(journal) => journal._id}
        renderItem={({ item }) => {
        return (
          <List.Item
            title={item.title}
            description={item.content}
            onPress={() => navigation.navigate('DetailJournal', { item })}
          />
        );
        }}
    />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    backgroundColor: '#fff',
  },
});

export default JournalScreen;