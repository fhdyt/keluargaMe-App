import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, Dimensions } from 'react-native';
import { IconButton, Button, List, Divider, Subheading, Banner, Title } from 'react-native-paper';
import { Context as MemberContext } from '../context/MemberContext';
import { SafeAreaView } from 'react-navigation';
import SkeletonContent from 'react-native-skeleton-content';
import Spacer from '../components/Spacer';

const HomeScreen =({navigation}) => {
  const { state, fetchFamily, loading, failedBanner } = useContext(MemberContext);
 
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
  const { width, height } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <Divider/>
      {
        state.failedBanner ? (
          <View style={{backgroundColor:'#d50000', borderRadius:10, height:100, alignItems:'center', justifyContent:'center', padding:10}}>
            <Title style={{color:'white'}}>Periksa koneksi internet anda.</Title>
            </View>):
        (
          <>
          {
              state.loading ? (
                <SkeletonContent
                        containerStyle={{flex: 1, alignItems: 'center', marginTop: 15}}
                        layout={[
                          { key: 'positif', 
                            height : 355, 
                            width: width-50,
                            borderRadius:15, 
                            marginVertical: 10 
                          }
                        ]}
                    >  
                    </SkeletonContent>
              ) :
              (
                <>
                { filter().length == 0  ? 
                (
                  <View>
                    <Subheading style={{color:'grey', textAlign: 'center'}}>Belum ada keluarga, Silahkan tambahkan anggota keluarga pertama anda.</Subheading>
                    <Spacer />
                    <Button icon="plus" style={{borderRadius:30}} mode="contained" color='#388e3c' onPress={() => navigation.navigate('AddFirstMember')}>Tambah Anggota Pertama</Button>
                  </View>
                ):(
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
                )}
                </>       
              )
            }
          </>
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
    marginHorizontal:20,
    backgroundColor: '#fff',
    marginBottom:10,
  },
});

export default HomeScreen;