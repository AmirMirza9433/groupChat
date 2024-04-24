import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

import ScreenWrapper from './molecules/ScreenWrapper';
import UserCard from './molecules/UserCard';
import Footer from './molecules/Footer';

const Chat = ({route}) => {
  const groupId = route.params?.id;
  const [messagesData, setMessagesData] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('userId').then(uid => setUserId(uid));
    const messagesListener = firestore()
      .collection('groupChats')
      .doc(groupId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });
        setMessagesData(data);
      });

    return () => messagesListener();
  }, []);
  const onSend = async () => {
    const uid = await AsyncStorage.getItem('userId');
    await firestore()
      .collection('groupChats')
      .doc(groupId)
      .collection('messages')
      .add({
        senderId: uid,
        message,
        createdAt: new Date(),
      });
    setMessage('');
  };
  return (
    <ScreenWrapper
      paddingBottom={0.1}
      footerUnScrollable={() => (
        <Footer
          inputText={message}
          setInputText={setMessage}
          sendMessage={onSend}
        />
      )}
      headerUnScrollable={() => <UserCard />}>
      <View style={styles.container}>
        <FlatList
          data={messagesData}
          inverted={messagesData.length == 0 ? false : true}
          showsVerticalScrollIndicator={false}
          keyExtractor={useCallback((_, i) => i, [])}
          renderItem={({item}) => (
            <View
              style={[
                styles.messageContainer,
                item?.senderId == userId
                  ? styles.userMessage
                  : styles.otherMessage,
              ]}>
              <Text
                style={{
                  color: item?.senderId == userId ? 'white' : 'black',
                  lineHeight: 25,
                }}>
                {item?.message}
              </Text>
              <Text
                style={{
                  color: item?.senderId == userId ? 'white' : 'black',
                  lineHeight: 25,
                }}>
                {item?.senderId}
              </Text>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Chat;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'green',
    borderBottomRightRadius: 0,
    elevation: 1,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'gray',
    borderBottomLeftRadius: 0,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.7,
  },
});
