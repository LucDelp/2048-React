/* eslint-disable */

import { compareBoardState, hasRelevantValue, boardInverter, getNullValuePosition } from './gameReducer'

const tab1 = [
  [0, 0, 0, 0],
  [0, 2, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 2, 0]
]

const fullTab = [
  [2,5,7],
  [1,9,8]
]

const tab1Inverted = [
  [0, 0, 0, 0],
  [0, 2, 0, 0],
  [0, 0, 0, 2],
  [0, 0, 0, 0]
]

const tab2 = [
  [0, 2, 0, 0],
  [0, 2, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 2, 0]
]

describe('test compareBoardState Function', () => {
  test('should return false', () => {
    expect(compareBoardState(tab1, tab2)).toBe(false)
  })
  
  test('should return true', () => {
    expect(compareBoardState(tab1, tab1)).toBe(true)
  })
})

describe('test hasRelevantValue Function', () => {
  test('should return false ', () => {
    expect(hasRelevantValue(tab1[0])).toBe(false)
  })
  
  test('should return true', () => {
    expect(hasRelevantValue(tab1[1])).toBe(true)
  })
})

describe('test boardInverter Function', () => {
  test('should return false ', () => {
    expect(compareBoardState(tab1, boardInverter(tab1))).toBe(false)
  })
  test('should return true', () => {
    expect(compareBoardState(tab1, boardInverter(tab1Inverted))).toBe(true)
  })
})

describe('test getNullValuePosition function', () => {
  test('should have length > 0', () => {
    expect(getNullValuePosition(tab1).length).not.toBe(0)
  })
  test('should be 0', () => {
    expect(getNullValuePosition(fullTab).length).toBe(0)
  })  
})


