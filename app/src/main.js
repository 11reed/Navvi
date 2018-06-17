import * as Block from './block'
import * as Row from './row'

const L = 1
const R = 2
const D = 3

const baseScores = [
  0,
  1,
  3,
  6,
  10,
]

const getBaseScoreByLevel = (baseScore, level) => baseScore * level
const getMaxScoreByLevel = level => 2 * ((level * (level + 1)) / 2)


const set = (state, originalBoard) => {
  const { curr } = state
  
  const coords = Block.getCoords(curr)
  if (coords.some(([x, y]) => x >= 0 && y >= 0 && originalBoard[y][x])) {
    return
  }
  
  const board = [...originalBoard]
  board.forEach((row, i) => {
    board[i] = [...row]
  })
  coords.forEach(([x, y]) => x >= 0 && y >= 0 && (board[y][x] = curr.type))
  return { ...state, board }
}

const move = (d, state, originalBoard) => {
  let { curr } = state
  
  let { coord } = curr
  let [x, y] = coord
  x = d === L ? x - 1 : (d === R ? x + 1 : x)
  y = d === D ? y + 1 : y
  coord = [x, y]
  
  const rotationSpec = Block.getRotationSpec(curr)
  const { minX, maxX, maxY } = rotationSpec
  if (x < minX || x > maxX || y > maxY) {
    return
  }
  
  curr = { ...curr, coord }
  return set({ ...state, curr }, originalBoard)
}

export const moveL = (state, originalBoard) => {
  return move(L, state, originalBoard)
}

export const moveR = (state, originalBoard) => {
  return move(R, state, originalBoard)
}

export const moveD = (state, originalBoard) => {
  return move(D, state, originalBoard)
}

export const spawn = (state, originalBoard) => {
  let { next } = state
  const curr = Block.newCurr(next)
  if (!moveD({ ...state, curr }, originalBoard)) {
    return
  }
  next = Block.newNext()
  return { ...state, curr, next }
}

export const score = (state) => {
  let { board, score, level } = state
  const destroying = []
  board.forEach((row, i) => {
    if (!row.some(cell => !cell)) {
      destroying.push({ row, i })
    }
  })
  if (!destroying.length) {
    return
  }
  const baseScore = baseScores[destroying.length]
  const baseScoreByLevel = getBaseScoreByLevel(baseScore, level)
  score += baseScoreByLevel
  while (score >= getMaxScoreByLevel(level)) {
    level += 1
  }
  board = [...board]
  destroying.forEach(({ row, i }) => {
    board.splice(i, 1)
    board.unshift(Row.newEmpty())
  })
  return { ...state, destroying, board, score, level }
}

export const rotate = (state, originalBoard) => {
  let { curr } = state
  const maxRotation = Block.getMaxRotation(curr)
  
  if (maxRotation === 1) {
    return
  }
  
  let { rotation } = curr
  rotation = (rotation + 1) % maxRotation
  curr = { ...curr, rotation }
  
  let { coord } = curr
  let [x, y] = coord
  const rotationSpec = Block.getRotationSpec(curr)
  const { maxY } = rotationSpec
  if (y > maxY) {
    return
  }
  const { minX, maxX, minY } = rotationSpec
  x = x < minX ? minX : (x > maxX ? maxX : x)
  y = y < minY ? minY : y
  coord = [x, y]
  
  curr = { ...curr, rotation, coord }
  return set({ ...state, curr }, originalBoard)
}