import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const WebInfoScreen =({navigation}) => {

  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://guarded-plains-47822.herokuapp.com/person' }} style={{ marginTop: 20 }} />;
    </View>
  );
}

WebInfoScreen.navigationOptions = ({ navigation }) => {
  return {
    title : '',
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    }      
    }
   
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    marginHorizontal:20,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignContent:'center'
  },
});

export default WebInfoScreen;