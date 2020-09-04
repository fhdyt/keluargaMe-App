import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { Button, Title, Paragraph, Caption, IconButton, Divider } from 'react-native-paper';
import { Context as JournalContext } from '../context/JournalContext';

const DetailJournalScreen =({navigation}) => {
    const { state, deleteJournal } = useContext(JournalContext)

    const item = navigation.state.params.item
    const [loadingButton, setLoadingButton] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)

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
            { text: "Hapus", onPress: () => {setLoadingButton(true); setDisabledButton(true); deleteJournal(_id, () => {navigation.navigate('Journal')})} }
        ],
            { cancelable: false }
        );
    }

  return (
    <View style={styles.container}>
      <Title>{item.title}</Title>
      <Caption>{item.createDate}</Caption>
      <Paragraph style={{marginTop:20}}>{item.content}</Paragraph>
      <Button style={{borderRadius:30, marginTop:30}} color="#d50000" icon="trash-can" mode="contained" loading={loadingButton} disabled={disabledButton} onPress={() => buttonAlert(item._id)}>Hapus</Button>
    </View>
  );
}

DetailJournalScreen.navigationOptions = ({ navigation }) => {
  const item = navigation.state.params.item
  return {
    title : '',
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
    headerRight: () => (
      <IconButton
        icon="pencil"
        color="black"
        size={25}
        onPress={() => navigation.navigate('EditJournal', {item})}
      />
    ),      
    }
   
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal:20,
    backgroundColor: '#fff',
    marginBottom:10,
  },
});

export default DetailJournalScreen;