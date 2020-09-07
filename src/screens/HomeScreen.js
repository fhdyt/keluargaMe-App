import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, Dimensions } from 'react-native';
import { IconButton, Button, List, Divider, Subheading, Snackbar} from 'react-native-paper';
import { Context as MemberContext } from '../context/MemberContext';
import { ScrollView } from 'react-native-gesture-handler';
import SkeletonContent from 'react-native-skeleton-content';
import Spacer from '../components/Spacer';
import { YellowBox } from 'react-native'


const HomeScreen =({navigation}) => {
  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
  ])
  const { state, fetchFamily, loading, failedActionClose, refreshing } = useContext(MemberContext);
 
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
    <>
    <View style={styles.container}>
      {
        state.failedBanner ? (
          <View style={{backgroundColor:'#d50000', borderRadius:10, height:100, alignItems:'center', justifyContent:'center', padding:10}}>
            <Subheading style={{color:'white'}}>Gagal mengambil data.</Subheading>
            <Text style={{color:'white'}}>Periksa koneksi internet anda.</Text>
          </View>):
        (
          <>
          {
              state.loading ? (
                <>
                  <SkeletonContent
                        container Style={{flex: 1, alignItems: 'center', marginTop: 15}}
                        layout={[
                          { key: 'nama', 
                            height : 30, 
                            width: width-80,
                            borderRadius:5,
                            marginTop:25, 
                            marginVertical: 10 
                          },
                          { key: 'alamat', 
                            height : 15, 
                            width: width-80,
                            borderRadius:5,
                            marginTop:0, 
                            marginVertical: 10 
                          },
                          { key: 'title_keluarga', 
                            height : 20, 
                            width: width-80,
                            borderRadius:5,
                            marginTop:20, 
                            marginVertical: 10 
                          },
                          { key: 'jumlah_keluarga', 
                            height : 15, 
                            width: width-80,
                            borderRadius:5,
                            marginTop:-8, 
                            marginVertical: 10 
                          },
                          { key: 'title_pria', 
                            height : 20, 
                            width: width-80,
                            borderRadius:5,
                            marginTop:20, 
                            marginVertical: 10 
                          },
                          { key: 'jumlah_pria', 
                            height : 15, 
                            width: width-80,
                            borderRadius:5,
                            marginTop:-8, 
                            marginVertical: 10 
                          },
                          { key: 'title_wanita', 
                            height : 20, 
                            width: width-80,
                            borderRadius:5,
                            marginTop:20, 
                            marginVertical: 10 
                          },
                          { key: 'jumlah_wanita', 
                            height : 15, 
                            width: width-80,
                            borderRadius:5,
                            marginTop:-8, 
                            marginVertical: 10 
                          }
                        ]}
                    >  
                  </SkeletonContent>
                </>
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
                  <>
                   <ScrollView showsVerticalScrollIndicator={false}>                   
                  <FlatList
                      showsVerticalScrollIndicator={false}
                      data={filter()}
                      keyExtractor={(member) => member._id}
                      onRefresh={() => {fetchFamily();refreshing()}}
                      refreshing={state.loading}
                      renderItem={({ item }) => {
                      return (
                        <View style={styles.data} >
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
                  </ScrollView>
                  </>
                )}
                </>       
              )
            }
          </>
        )
      }
      <Snackbar
        visible={state.failedAction}
        onDismiss={failedActionClose}
        action={{
          label: 'Tutup',
          onPress: () => {
            failedActionClose()
          },
        }}>
        Gagal memproses.
      </Snackbar>
    </View>
    </>
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
    flex: 1,
    justifyContent: 'space-around',
  },
  data: {
   borderColor:"grey", 
    borderRadius:15,
    padding:10,
    marginVertical:10
  }
});

export default HomeScreen;