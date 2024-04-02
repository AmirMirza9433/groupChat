import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');
const Item = ({onPress, image = '', name = 'group', time = ''}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.mainContainer}>
      <View style={styles.first}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.second}>
        <View style={styles.row}>
          <Text style={{fontWeight: '500', color: 'black'}}>{name}</Text>
          <Text style={{fontSize: 12, color: 'gray'}}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 40,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
