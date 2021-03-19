import { TOTAL_ROW } from './layout'
import * as Row from './row'

export const newEmpty = () => {
  const board = []
  for (let i = 0; i < TOTAL_ROW; i++) {
    board.push(Row.newEmpty())
  }
  return board
}
