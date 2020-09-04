import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Button, Headline, RadioButton, Switch, ToggleButton } from 'react-native-paper';
import Spacer from '../components/Spacer';

const JournalForm =({ onSubmit, initialValues, buttonTitle }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  
  const [loadingButton, setLoadingButton] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)

  return (
    <ScrollView>
    <View style={styles.container}>
      <TextInput
        label="Judul"
        mode="outlined"
        value={title}
        onChangeText={title => setTitle(title)}
    />
    <Spacer />
    <TextInput
        label="Deskripsi"
        mode="outlined"
        value={content}
        multiline={true}
        numberOfLines={6}
        onChangeText={content => setContent(content)}
    />
    <Spacer />
    <Button 
      loading={loadingButton}
      disabled={disabledButton}
      mode="contained" 
      style={{borderRadius:30}} 
      color="#388e3c" 
      onPress={() => {
        setLoadingButton(true);
        setDisabledButton(true);
        onSubmit(title, content);
        }
    }>{buttonTitle}</Button>
    </View>
    </ScrollView>
  );
}

JournalForm.defaultProps = {
    initialValues: {
      title: '',
      content: '',
    }
  };

const styles = StyleSheet.create({
  container: {
    marginHorizontal:20,
    marginBottom:10,
    backgroundColor: '#fff',
  },
});

export default JournalForm;