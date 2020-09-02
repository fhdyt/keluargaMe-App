import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { Button, Title, Paragraph, Subheading } from 'react-native-paper';
import { Context as JournalContext } from '../context/JournalContext';

const DetailJournalScreen =({navigation}) => {
    const { state, deleteJournal } = useContext(JournalContext)

    const item = navigation.state.params.item

      const buttonAlert = (_id) =>
    {
        Alert.alert(
        "",
        "Anda yakin untuk menghapus jurnal ini ? ",
        [
            {
            text: "Batal",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "Hapus", onPress: () => {deleteJournal(_id, () => {navigation.navigate('Journal')})} }
        ],
            { cancelable: false }
        );
    }

  return (
    <View style={styles.container}>
      <Title>{item.title}</Title>
      <Subheading>{item.date}</Subheading>
      <Paragraph>{item.content}</Paragraph>
      <Button icon="plus" mode="contained" onPress={() => navigation.navigate('EditJournal', {item})}>Edit</Button>
      <Button icon="trash-can" mode="contained" onPress={() => buttonAlert(item._id)}>Hapus</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    backgroundColor: '#fff',
  },
});

export default DetailJournalScreen;