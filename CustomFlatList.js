import {Animated, FlatList, StyleSheet, Text} from 'react-native';
import React, {useRef} from 'react';

const cardHeight = 200;
const padding = 10;
const offset = cardHeight + padding;

const CustomFlatList = ({data}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <FlatList
      style={styles.container}
      data={data}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: false,
      })}
      keyExtractor={item => item}
      renderItem={({item, index}) => {
        const inputRange = [offset * index, offset * index + offset];
        const outputRange1 = [1, 0];
        const outputRange2 = [0, offset / 2];

        const scale = scrollY.interpolate({
          inputRange,
          outputRange: outputRange1,
          extrapolate: 'clamp',
        });

        const translateY = scrollY.interpolate({
          inputRange,
          outputRange: outputRange2,
          extrapolate: 'clamp',
        });

        const opacity = scale;

        return (
          <Animated.View
            style={[
              styles.card,
              {opacity, transform: [{translateY}, {scale}]},
            ]}>
            <Text style={styles.cardText}>Hello World</Text>
          </Animated.View>
        );
      }}
    />
  );
};

export default CustomFlatList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    paddingVertical: padding / 2,
  },
  card: {
    flex: 1,
    marginHorizontal: 10,
    height: cardHeight,
    backgroundColor: 'red',
    borderRadius: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
  },
});
