import { TOTAL_COL, TOTAL_ROW } from './layout'

const MAX_X = TOTAL_COL - 1
const MAX_Y = TOTAL_ROW - 1

const DEFAULT_X = Math.floor(TOTAL_COL / 2)

const getRotationType = (type, rotation) => `${type}${rotation}`

const parse = (type, spec) => {
  const specRows = spec.replace(/\s/g, '').slice(1, -1).split('][')
  const maxRotation = specRows.length / 4
  const diffsByRotation = {}
  specRows.forEach((r, i) => {
    const rotation = i % maxRotation
    const rotationType = getRotationType(type, rotation)
    if (i < maxRotation) {
      diffsByRotation[rotationType] = [[0, 0]]
    }
    const y = Math.floor(i / maxRotation)
    const diffs = diffsByRotation[rotationType]
    r.split('').forEach((c, x) => c === 'x' && diffs.push([x - 2, y - 1]))
  })
  const specByRotation = {
    [type]: maxRotation,
  }
  Object.entries(diffsByRotation).forEach(([rotationType, diffs]) => {
    let minMax = [0, 0, 0]
    diffs.forEach(([dx, dy]) => {
      let [dxm, dxM, dyM] = minMax
      dxm = dx < dxm ? dx : dxm
      dxM = dx > dxM ? dx : dxM
      dyM = dy > dyM ? dy : dyM
      minMax = [dxm, dxM, dyM]
    })
    const [dxm, dxM, dyM] = minMax
    specByRotation[rotationType] = {
      minX: -dxm,
      maxX: MAX_X - dxM,
      minY: -dyM - 1,
      maxY: MAX_Y - dyM,
      diffs,
    }
  })
  return specByRotation
}

const blockTypes = [
  'I',
  'J',
  'L',
  'O',
  'S',
  'T',
  'Z',
]

const blockSpecs = Object.assign(
  parse('I', `[ - - x -] [ - - - -]
    [ - - o -] [ x x o x]
    [ - - x -] [ - - - -]
    [ - - x -] [ - - - -]
  `),
  parse('J', `[ - - x -] [ - x - -] [ - - x x] [ - - - -]
    [ - - o -] [ - x o x] [ - - o -] [ - x o x]
    [ - x x -] [ - - - -] [ - - x -] [ - - - x]
    [ - - - -] [ - - - -] [ - - - -] [ - - - -]
  `),
  parse('L', `[ - - x -] [ - - - -] [ - x x -] [ - - - x]
    [ - - o -] [ - x o x] [ - - o -] [ - x o x]
    [ - - x x] [ - x - -] [ - - x -] [ - - - -]
    [ - - - -] [ - - - -] [ - - - -] [ - - - -]
  `),
  parse('O', `[ - - - -]
    [ - x o -]
    [ - x x -]
    [ - - - -]
  `),
  parse('S', `[ - - x x] [ - x - -]
    [ - x o -] [ - x o -]
    [ - - - -] [ - - x -]
    [ - - - -] [ - - - -]
  `),
  parse('T', `[ - - - -] [ - - x -] [ - - x -] [ - - x -]
    [ - x o x] [ - x o -] [ - x o x] [ - - o x]
    [ - - x -] [ - - x -] [ - - - -] [ - - x -]
    [ - - - -] [ - - - -] [ - - - -] [ - - - -]
  `),
  parse('Z', `[ - x x -] [ - - - x]
    [ - - o x] [ - - o x]
    [ - - - -] [ - - x -]
    [ - - - -] [ - - - -]
  `),
)

export const getMaxRotation = (block) => {
  const { type } = block
  return blockSpecs[type]
}

export const getRotationSpec = (block) => {
  const { type, rotation } = block
  const rotationType = getRotationType(type, rotation)
  return blockSpecs[rotationType]
}

export const getCoords = (curr) => {
  const [x0, y0] = curr.coord
  return getRotationSpec(curr).diffs
    .map(([dx, dy]) => [x0 + dx, y0 + dy])
}

export const newNext = () => {
  const type = blockTypes[Math.floor(Math.random() * blockTypes.length)]
  const rotation = Math.floor(Math.random() * getMaxRotation({ type }))
  return { type, rotation }
}

export const newCurr = (next) => {
  const coord = [DEFAULT_X, getRotationSpec(next).minY]
  return { ...next, coord }
}