import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Button, Headline, RadioButton, Switch, ToggleButton } from 'react-native-paper';
import Spacer from '../components/Spacer';

const JournalForm =({ onSubmit, initialValues, buttonTitle }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  
  return (
    <ScrollView>
      <Spacer />
    <View style={styles.container}>
      <TextInput
        label="Judul"
        value={title}
        onChangeText={title => setTitle(title)}
    />
    <Spacer />
    <TextInput
        label="Deskripsi"
        value={content}
        multiline={true}
        numberOfLines={6}
        onChangeText={content => setContent(content)}
    />
    <Spacer />
    <Button mode="contained" color="#388e3c" onPress={() => onSubmit(title, content)}>{buttonTitle}</Button>
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
    marginHorizontal:10,
    backgroundColor: '#fff',
  },
});

export default JournalForm;