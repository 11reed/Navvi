import { TOTAL_COL } from './layout'

export const newEmpty = () => {
  const row = []
  for (let i = 0; i < TOTAL_COL; i++) {
    row.push('')
  }
  return row
 };
