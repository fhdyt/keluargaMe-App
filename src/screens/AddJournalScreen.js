import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Context as JournalContext } from '../context/JournalContext';
import JournalForm from '../components/JournalForm';

const AddJournalScreen =({ navigation }) => {
  const { add_journal } = useContext(JournalContext);

  return (
    <JournalForm
    buttonTitle="Simpan"
    header="Tambah Journal"
    onSubmit={(title, content) => {
      add_journal({title, content}, () => navigation.navigate('Journal'));
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

export default AddJournalScreen;