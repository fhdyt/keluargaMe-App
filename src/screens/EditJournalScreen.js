import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Context as JournalContext } from '../context/JournalContext';
import JournalForm from '../components/JournalForm';
const EditJournalScreen =({ navigation }) => {
  const item = navigation.state.params.item
  const _id = item._id;
  
  const { edit_journal } = useContext(JournalContext);
  return (
    <JournalForm
    buttonTitle="Edit"
    initialValues={{ 
        title: item.title, 
        content: item.content,
    }}
    onSubmit={(title, content) => {
      edit_journal({_id, title, content}, () => navigation.navigate('Journal'));
    }}
    />
  );
}

EditJournalScreen.navigationOptions = ({ navigation }) => {
  return {
    title : 'Edit Jurnal',
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

export default EditJournalScreen;