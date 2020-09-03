import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Button, Headline, RadioButton, Switch, ToggleButton } from 'react-native-paper';


const JournalForm =({ onSubmit, initialValues, buttonTitle }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  
  return (
    <ScrollView>
    <View style={styles.container}>
      <TextInput
        label="Judul"
        value={title}
        onChangeText={title => setTitle(title)}
    />
    <TextInput
        label="Isi"
        value={content}
        multiline={true}
        numberOfLines={6}
        onChangeText={content => setContent(content)}
    />
    <Button onPress={() => onSubmit(title, content)}>{buttonTitle}</Button>
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