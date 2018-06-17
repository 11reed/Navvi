import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import BoardI from './BoardI'

import * as Block from '../src/block'
import * as Board from '../src/board'
import * as Main from '../src/main'
import { BOARD_H, HEAD_H } from '../src/layout'


export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      level: 1,
      next: Block.newNext(),
      curr: null,
      board: Board.newEmpty(),
      destroying: [],
    }
    this.originalBoard = this.state.board

    this.loopTicket = 0
  }

  componentDidMount() {
    this.loop()
  }

  componentWillUnmount() {
    clearTimeout(this.loopTicket)
  }

  loop = () => {
    const { state, originalBoard } = this
    let { curr, next } = state
    if (!curr) {
      curr = state.curr = Block.newCurr(next)
      next = state.next = Block.newNext()
      this.setState({ curr, next })
    }
    const moveDownState = Main.moveD(state, originalBoard)
    if (moveDownState) {
      this.setState(moveDownState)
    } else {
      const scoreState = Main.score(state)
      if (scoreState) {
        this.setState(scoreState)
      }
      
      const spawnState = Main.spawn(scoreState || state, originalBoard)
      if (!spawnState) {
        
        return
      }
      this.setState(spawnState)
      this.originalBoard = spawnState.board
    }
    this.loopTicket = setTimeout(this.loop, (700 / Math.sqrt(this.state.level)))
  }

  rotate = () => {
    const { state, originalBoard } = this
    const newState = Main.rotate(state, originalBoard)
    if (!newState) {
      return
    }
    this.setState(newState)
  }
  moveL = () => {
    const { state, originalBoard } = this
    const newState = Main.moveL(state, originalBoard)
    if (!newState) {
      return
    }
    this.setState(newState)
  }
  moveR = () => {
    const { state, originalBoard } = this
    const newState = Main.moveR(state, originalBoard)
    if (!newState) {
      return
    }
    this.setState(newState)
  }
  moveD = () => {
    const { state, originalBoard } = this
    const newState = Main.moveD(state, originalBoard)
    if (!newState) {
      return
    }
    this.setState(newState)
  }

  render() {
    return (
      <View style={styles.app}>
        <View style={styles.head}>
          <View style={styles.headRow}>
            <TouchableWithoutFeedback onPress={this.moveL}>
              <View style={styles.headButton}>
                <Text style={styles.headButtonText}>Left</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.rotate}>
              <View style={styles.headButton}>
                <Text style={styles.headButtonText}>Rotate</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.moveR}>
              <View style={styles.headButton}>
                <Text style={styles.headButtonText}>Right</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.headRow}>
            <TouchableWithoutFeedback>
              <View style={styles.headButton}>
                <Text style={styles.headButtonText}>Score</Text>
                <Text style={styles.headButtonText}>{`${this.state.score}`}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.moveD}>
              <View style={styles.headButton}>
                <Text style={styles.headButtonText}>Down</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.headButton}>
                <Text style={styles.headButtonText}>Level: {`${this.state.level}`}</Text>
                <Text style={styles.headButtonText}>Next: {`${this.state.next.type}`}</Text>
              </View>
            </TouchableWithoutFeedback> 
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.board}>
            <BoardI board={this.state.board} />
          </View>
        </View>
        <StatusBar hidden />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'black',
  },
  head: {
    height: HEAD_H, 
  },
  headRow: { 
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderLeftWidth: 1,
    borderLeftColor: 'black',
  },
  headButton: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headButtonText: {
    fontWeight: '600',
    color: '#7DCEA0',
  },
  body: {
    flexDirection: 'row',
  },
  board: {
    flex: 8,
    height: BOARD_H,
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
});