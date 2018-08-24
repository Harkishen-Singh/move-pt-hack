import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Navigator} from './router';
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
