import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const UserCard = ({
  image = '',
  name = 'User Name',
  email = 'useremail@gmail.com',
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.first}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.second}>
        <View>
          <Text style={{fontWeight: 'bold', marginBottom: 2, color: 'black'}}>
            {name}
          </Text>
          <Text style={{fontSize: 12, fontWeight: '500', color: 'gray'}}>
            {email}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: 'red',
  },
  first: {
    width: '18%',
  },
  second: {
    width: '82%',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: 'blue',
  },
});
