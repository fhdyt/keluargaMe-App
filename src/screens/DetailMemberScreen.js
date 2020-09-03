import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { TextInput, Button, Headline, List, IconButton, Divider } from 'react-native-paper';
import { Context as MemberContext } from '../context/MemberContext';
import { ScrollView } from 'react-native-gesture-handler';
import { YellowBox } from 'react-native'

const DetailMemberScreen =({navigation}) => {
    YellowBox.ignoreWarnings([
      'VirtualizedLists should never be nested',
    ])
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
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
        <View style={{borderWidth:1, 
          borderColor:"grey", 
          borderRadius:15,
          padding:10,
          marginVertical:10
          }} >
        <List.Item
          title={item.name}
          titleStyle={{fontSize:25, fontWeight:'bold'}}
          description={item.address}
        />
            <Divider/>
        <List.Item
          title='Tanggal Lahir'
          description={item.birthdate}
        />
            <Divider/>
        <List.Item
          title='Tanggal Meninggal'
          description={item.diedate}
        />
            <Divider/>
        <List.Item
          title='No. Handphone'
          description={item.phone}
        />
        <Button icon="account-edit" color="#283593" style={[styles.button,{marginBottom:10}]} mode="contained" onPress={() => navigation.navigate('EditMember', {item})}>Edit</Button>
        <Button icon="trash-can" color="#d50000" style={styles.button} mode="contained" onPress={() => buttonAlert(item._id)}>Hapus</Button>
      </View>
      <Divider />
      <View style={{borderWidth:1, 
          borderColor:"grey", 
          borderRadius:15,
          padding:10,
          marginTop:5
          }} >
            <Button color="#388e3c" icon="account-plus" style={styles.button} mode="contained" onPress={() => navigation.navigate('AddMember', {item})}>Tambah Keluarga</Button>
      <FlatList
            showsVerticalScrollIndicator={false}
            data={members(item._id)}
            keyExtractor={(member) => member._id}
            renderItem={({ item }) => {
              if(item.tags[0] == 'assistant')
              {
                if(item.gender === 'M')
                {
                  var subtitle = 'Suami'
                }
                else
                {
                  var subtitle = 'Istri'
                }
              }
              else{
                var subtitle = 'Anak';
              }
            return (
                <List.Item
                title={item.name}
                description={subtitle}
                onPress={() => navigation.push('DetailMember', { item })}
                />
            );
            }}
        />
        </View>
    </View>
    </ScrollView>
  );
}

DetailMemberScreen.navigationOptions = ({ navigation }) => {
  return {
    title : '',
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
    headerRight: () => (
      <IconButton
        icon="home"
        color="black"
        size={25}
        onPress={() => navigation.navigate('Home')}
      />
    ),
      
    }
   
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal:10,
    backgroundColor: '#fff',
    marginBottom:5
  },
  button: {
    borderRadius: 30
  }
});

export default DetailMemberScreen;