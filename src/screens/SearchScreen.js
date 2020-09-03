import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Searchbar, List } from 'react-native-paper';
import { Context as MemberContext } from '../context/MemberContext';

const SearchScreen = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { state } = useContext(MemberContext);

    const findQuery =(key) =>{
        return state.personData.filter(result => {
            // if(!key)
            // {
            //     return null
            // }
            return result.name.match(new RegExp(`${key}`, 'gi'));
          });
    }


    return (
        <View style={styles.container}>
            <SafeAreaView forceInset={{ top: 'always' }}>
            <Searchbar
                autoFocus={true}
                placeholder="Cari"
                onChangeText={setSearchQuery}
                value={searchQuery}
                focus
            />
            <View>
            <FlatList
                    showsVerticalScrollIndicator={false}
                    data={findQuery(searchQuery)}
                    keyExtractor={(member) => member._id}
                    renderItem={({ item }) => {
                    return (
                        <List.Item
                            title={item.name}
                            description={item.address}
                            onPress={() => navigation.navigate('DetailMember', { item })}
                        />
                    );
                    }}
                />
            </View>
      </SafeAreaView>
      </View>
    );
}

SearchScreen.navigationOptions = ({ navigation }) => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 100,
        marginHorizontal: 10
      },

});

export default SearchScreen;