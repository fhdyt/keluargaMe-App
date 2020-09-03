import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, IconButton, List, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { Context as JournalContext } from '../context/JournalContext';

const JournalScreen =({navigation}) => {

  const { state, fetchJournal } = useContext(JournalContext);
 
  useEffect(() => {
    fetchJournal();
  }, []);

  return (
    <View style={styles.container}>
      <Divider/>
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
    </View>
  );
}

JournalScreen.navigationOptions = ({ navigation }) => {
  return {
    title : 'Jurnal Keluarga',
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
    headerRight: () => (
      <IconButton
        icon="plus"
        color="black"
        size={25}
        onPress={() => navigation.navigate('AddJournal')}
      />
    ),
      
    }
   
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    backgroundColor: '#fff',
  },
});

export default JournalScreen;