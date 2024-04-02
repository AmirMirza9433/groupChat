import {FlatList, RefreshControl, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';

import ScreenWrapper from './molecules/ScreenWrapper';
import Item from './molecules/Item';

const Messages = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [chatList, setChatList] = useState([]);
  const getChatList = async () => {
    try {
      setRefreshing(true);
      const snapshot = await firestore().collection('groupChats').get();
      const tempArray = snapshot.docs.map(doc => doc.data());
      console.log('==========tempArray', tempArray);
      setChatList(tempArray);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.log('=============err', error);
    }
  };
  useEffect(() => {
    getChatList();
  }, []);

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <View style={header}>
          <View style={{width: '15%'}}>
            <Ionicons
              name="arrow-back"
              size={22}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
          <Text style={{fontSize: 20, fontWeight: '600'}}>Messages</Text>
        </View>
      )}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getChatList}
            colors={['blue']}
          />
        }
        data={['5663945703258683']}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <Item onPress={() => navigation.navigate('Chat', {id: item})} />
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
