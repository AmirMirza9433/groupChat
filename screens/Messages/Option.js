import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import React, {useState} from 'react';

const Option = ({navigation}) => {
  const [name, setName] = useState('');
  const [isModal, setModal] = useState(false);
  function generateID() {
    return Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(10, '0');
  }

  const onCreate = async () => {
    try {
      const res = await firestore().collection('groupChats').add({
        name,
        createdAt: new Date(),
        id: generateID(),
      });
      setModal(false);
      setName('');
      console.log('============res', res);
    } catch (error) {
      console.log('===============error', error);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Create Group" onPress={() => setModal(true)} />
      <View style={{height: 30}} />
      <Button
        title="View Groups"
        onPress={() => navigation.navigate('Messages')}
      />
      <Modal isVisible={isModal}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 20}}>
          <Text style={{marginBottom: 20}}>Create Group</Text>
          <TextInput
            placeholder="Enter Name..."
            value={name}
            onChangeText={setName}
            style={{
              width: '100%',
              paddingHorizontal: 15,
              backgroundColor: 'lightgray',
              borderRadius: 10,
              marginBottom: 20,
            }}
          />
          <Button title="Create" onPress={onCreate} disabled={!name} />
        </View>
      </Modal>
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({});
