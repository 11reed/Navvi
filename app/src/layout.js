import { Dimensions } from 'react-native'

export const TOTAL_COL = 10
export const TOTAL_ROW = 19

const dims = Dimensions.get('window')

export const BOARD_W = 0.8 * dims.width
export const BOARD_H = BOARD_W * (TOTAL_ROW / TOTAL_COL)

export const HEAD_H = dims.height - BOARD_H

export const CELL_W = BOARD_W / TOTAL_COL
