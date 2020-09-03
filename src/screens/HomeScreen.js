import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { IconButton, Button, List, Divider } from 'react-native-paper';
import { Context as MemberContext } from '../context/MemberContext';
import { SafeAreaView } from 'react-navigation';

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

  var gender_M = () => {
    return state.personData.filter(result => {
      return result.gender === 'M';
    });
  };

  var gender_F = () => {
    return state.personData.filter(result => {
      return result.gender === 'F';
    });
  };

  return (
    <View style={styles.container}>
      <Divider/>
      {
        !filter().length ? (
          <Button icon="plus" style={{borderRadius:30}} mode="contained" color='#388e3c' onPress={() => navigation.navigate('AddFirstMember')}>Tambah Anggota Pertama</Button>
        ) :
        (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filter()}
            keyExtractor={(member) => member._id}
            renderItem={({ item }) => {
            return (
              <View style={{borderWidth:1, 
                borderColor:"grey", 
                borderRadius:15,
                padding:10,
                marginVertical:10
                }} >
                  <List.Item
                    title={item.name}
                    titleStyle={{fontSize:30, fontWeight:'bold'}}
                    description={item.address}
                  />
                  <Divider/>
                  <List.Item
                    title='Keluarga'
                    description={state.personData.length}
                  />
                  <Divider/>
                  <List.Item
                    title='Pria'
                    description={gender_M().length}
                  />
                  <Divider/>
                  <List.Item
                    title='Wanita'
                    description={gender_F().length}
                  />
                  <Button style={{borderRadius:30}} mode="contained" color="#388e3c" onPress={() => navigation.navigate('DetailMember', { item })}>Lihat</Button>
                  </View>
            );
            }}
        />
        )
      }
    </View>
  );
}

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    title : 'Keluarga.me',
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
    headerRight: () => (
      <IconButton
        icon="information-outline"
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
  },
});

export default HomeScreen;