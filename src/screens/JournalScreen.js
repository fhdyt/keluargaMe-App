import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Text} from 'react-native';
import { Button, IconButton, List, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { Context as JournalContext } from '../context/JournalContext';
import SkeletonContent from 'react-native-skeleton-content';
const JournalScreen =({navigation}) => {

  const { state, fetchJournal, loading } = useContext(JournalContext);
 
  useEffect(() => {
    fetchJournal();
  }, []);

  const { width, height } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <Divider/>
      { state.loading ? (
        <>
        <SkeletonContent
            containerStyle={{flex: 1, alignItems: 'center', marginTop: 0}}
            layout={[
              { key: 'title', 
                height : 20, 
                width: width-30,
                marginTop:14,
                marginBottom:5
              },
              { key: 'content', 
                height : 35, 
                width: width-30,
              },
              { key: 'title2', 
                height : 20, 
                width: width-30,
                marginTop:26,
                marginBottom:5
              },
              { key: 'content2', 
                height : 35, 
                width: width-30,
              },
              { key: 'title23', 
                height : 20, 
                width: width-30,
                marginTop:25,
                marginBottom:5
              },
              { key: 'content23', 
                height : 35, 
                width: width-30,
              }
            ]}
        >  
        </SkeletonContent>
        </>
      ):(
        <>
        
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
    </>
      )}
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