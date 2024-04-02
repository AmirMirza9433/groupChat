import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';

const FocusAwareStatusBar = props => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar barStyle="dark-content" backgroundColor={'white'} {...props} />
  ) : null;
};

const ScreenWrapper = ({
  children,
  statusBarColor = 'white',
  transclucent = false,
  scrollEnabled = false,
  backgroundImage,
  backgroundColor = 'white',
  headerUnScrollable = () => null,
  footerUnScrollable = () => null,
  barStyle = 'dark-content',
  refreshControl,
  paddingBottom,
  nestedScrollEnabled,
  paddingHorizontal,
}) => {
  const content = () => {
    return (
      <View
        style={[
          styles.container,
          {
            paddingBottom: paddingBottom || 75,
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
          },
        ]}>
        <FocusAwareStatusBar
          barStyle={barStyle}
          backgroundColor={statusBarColor}
          translucent={transclucent}
        />
        {!transclucent && (
          <SafeAreaView
            style={(styles.container, {backgroundColor: statusBarColor})}
          />
        )}
        {headerUnScrollable()}

        {scrollEnabled ? (
          <KeyboardAwareScrollView
            nestedScrollEnabled={nestedScrollEnabled}
            refreshControl={refreshControl}
            style={[
              styles.container,
              {backgroundColor, paddingHorizontal: paddingHorizontal || 15},
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {children}
          </KeyboardAwareScrollView>
        ) : (
          <View style={{paddingHorizontal: paddingHorizontal || 15, flex: 1}}>
            {children}
          </View>
        )}
        {footerUnScrollable()}
      </View>
    );
  };
  return content();
};

export default ScreenWrapper;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
