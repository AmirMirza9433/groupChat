import firestore from '@react-native-firebase/firestore';
import {FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';

import ScreenWrapper from './molecules/ScreenWrapper';
import Item from './molecules/Item';

const Messages = ({navigation}) => {
  const [chatList, setChatList] = useState([]);
  console.log('===========================', chatList);

  useEffect(() => {
    const messagesListener = firestore()
      .collection('groupChats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });
        setChatList(data);
      });

    return () => messagesListener();
  }, []);

  return (
    <ScreenWrapper>
      <FlatList
        data={chatList}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <Item
            name={item?.name}
            onPress={() => navigation.navigate('Chat', {id: item?.id})}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Messages;
const header = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingHorizontal: 20,
  paddingVertical: 15,
  borderBottomColor: 'gray',
  borderBottomWidth: 0.7,
};
