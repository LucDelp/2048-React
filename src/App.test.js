import { compareBoardState } from './boardReducer'

const tab1 = [
  [0, 0, 0, 0],
  [0, 2, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 2, 0]
]
const tab2 = [
  [0, 2, 0, 0],
  [0, 2, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 2, 0]
]

test('should return false', () => {
  expect(compareBoardState(tab1, tab2)).toBe(false)
})

test('should return true', () => {
  expect(compareBoardState(tab1, tab1)).toBe(true)
})
