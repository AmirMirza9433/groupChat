import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';

const Footer = ({inputText, setInputText, sendMessage}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={'chatPlaceholder'}
        value={inputText}
        multiline
        textAlignVertical="top"
        onChangeText={text => setInputText(text)}
      />

      <TouchableOpacity
        disabled={!inputText?.length}
        style={[
          styles.sendContainer,
          {
            backgroundColor: !inputText?.length ? 'gray' : 'green',
          },
        ]}
        onPress={sendMessage}>
        <Feather name="send" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: 'black',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    paddingVertical: 10,
  },
  sendContainer: {
    width: 56,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
