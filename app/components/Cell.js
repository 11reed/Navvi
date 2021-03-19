import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

const cellStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: 2,
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    backgroundColor: 'black',
  },
  empty: {
    ...cellStyles,
    backgroundColor: '#7dcea0',
  },
  emptyDeco: {
    ...cellStyles,
    borderBottomWidth: 15,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  I: {
    ...cellStyles,
    backgroundColor: '#ff0000',
  },
  J: {
    ...cellStyles,
    backgroundColor: '#0000ff',
  },
  L: {
    ...cellStyles,
    backgroundColor: '#ff8c00',
  },
  O: {
    ...cellStyles,
    backgroundColor: '#d7dbdd',
  },
  S: {
    ...cellStyles,
    backgroundColor: '#ff00ff',
  },
  T: {
    ...cellStyles,
    backgroundColor: '#00ff00',
  },
  Z: {
    ...cellStyles,
    backgroundColor: '#ffff00',
  },
  deco: {
    ...cellStyles,
    borderWidth: 4,
    borderTopColor: 'rgba(0,0,0,0.2)',
    borderRightColor: 'rgba(0,0,0,0.2)',
    borderBottomColor: 'rgba(0,0,0,0.7)',
    borderLeftColor: 'rgba(0,0,0,0.7)',
  },
})

export default class Cell extends Component {
  render() {
    const { cell } = this.props
    return (
      <View style={styles.cell}>
        <View style={styles[cell ? cell : 'empty']} />
        <View style={styles[cell ? 'deco' : 'emptyDeco']} />
      </View>
    )
  }
}
