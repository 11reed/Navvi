import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Cell from './Cell'

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
})

export default class Row extends Component {
  render() {
    return (
      <View style={styles.row}>
        {this.props.row.map((cell, i) => <Cell cell={cell} key={i} />)}
      </View>
    )
  }
}