import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Context as JournalContext } from '../context/JournalContext';
import JournalForm from '../components/JournalForm';

const AddJournalScreen =({ navigation }) => {
  const { add_journal } = useContext(JournalContext);

  return (
    <JournalForm
    buttonTitle="Simpan"
    onSubmit={(title, content) => {
      add_journal({title, content}, () => navigation.navigate('Journal'));
    }}
    />
  );
}

AddJournalScreen.navigationOptions = ({ navigation }) => {
  return {
    title : 'Tambah Jurnal',
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

export default AddJournalScreen;