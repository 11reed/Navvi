import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import Row from './Row'

const styles = StyleSheet.create({
  board: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
})

export default class BoardI extends Component {
  render() {
    return (
      <View style={styles.board}>
        {this.props.board.map((row, i) => <Row row={row} key={i} />)}
      </View>
    )
  }
}