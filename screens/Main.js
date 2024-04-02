import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {View, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';

const Main = ({navigation}) => {
  const [email, setEmail] = useState('amirmirza1@gmail.com');
  const [password, setPassword] = useState('Test@123');

  const login = async () => {
    try {
      const res = await auth().signInWithEmailAndPassword(
        email?.toLowerCase()?.trim(),
        password,
      );
      const uid = res?.user?.uid;
      await AsyncStorage.setItem('userId', uid);
      console.log('=====================res', res);
      navigation.navigate('Messages');
    } catch (error) {
      console.log('==========errLogin', error);
    }
  };

  const signup = async () => {
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);
      console.log('=====================res', res);
      const uid = res?.user?.uid;
      await AsyncStorage.setItem('userId', uid);
      await firestore().collection('user').doc(uid).set({email, password, uid});
    } catch (error) {
      console.log('========err', error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={login} />
      <Button title="Sign up" onPress={signup} />
    </View>
  );
};
export default Main;
