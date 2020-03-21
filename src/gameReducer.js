import { LEFT, RIGHT, UP, DOWN, NEW_GAME, GET_BOARD_WITH_INSERT } from './gameAction'
import { flattenDeep } from 'lodash'

const board = [
  [0, 0, 0, 0],
  [0, 2, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 2, 0]
]

export const DEFAULT_GAME_STATE = {
  board,
  isLost: false,
  currentScore: 0,
  bestScore: 0,
  topScore: 0,
  hasChanged: false
}

export function gameReducer (gameState, action) {
  switch (action.type) {
    case LEFT:
      return { ...gameState, ...sideMovement(gameState.board, LEFT) }
    case RIGHT:
      return { ...gameState, ...sideMovement(gameState.board, RIGHT) }
    case UP:
      return { ...gameState, ...heightMovement(gameState.board, UP) }
    case DOWN:
      return { ...gameState, ...heightMovement(gameState.board, DOWN) }
    case NEW_GAME:
      return { ...DEFAULT_GAME_STATE }
    case GET_BOARD_WITH_INSERT:
      return { ...gameState, ...boardWithInsertedNewValue(gameState.board) }
    default:
      return gameState
  }
}

function hasRelevantValue (nestedArray) {
  return undefined !== nestedArray.find(e => e !== 0)
}

function sideMovement (boardState, direction) {
  const calculatedBoard = boardState.map(row => {
    if (hasRelevantValue(row)) {
      /** calcule de la ligne */
      switch (direction) {
        case LEFT:
          return firstDirectionCalculation(row)
        case RIGHT:
          return secondDirectionCalculation(row)
        default:
          break
      }
    }
    return row
  })

  return { board: calculatedBoard, hasChanged: !compareBoardState(boardState, calculatedBoard) }
}

/** FIRST DIRECTION MEANS : 👈 || 👆 */

function firstDirectionCalculation (nestedArray) {
  const ordererdFirstDirectionNestedArray = orderNestedArrayFirstDirection(nestedArray)
  const [elem1, elem2, elem3, elem4] = ordererdFirstDirectionNestedArray

  if (elem1 === elem2 && elem1 !== 0) {
    return [2 * elem1, elem3, elem4, 0]
  } else if (elem2 === elem3 && elem2 !== 0) {
    return [elem1, 2 * elem2, elem4, 0]
  } else if (elem3 === elem4 && elem3 !== 0) {
    return [elem1, elem2, 2 * elem3, 0]
  }
  return ordererdFirstDirectionNestedArray
}

function orderNestedArrayFirstDirection (nestedArray) {
  const orderedArray = nestedArray.filter(e => e !== 0)
  while (orderedArray.length < 4) {
    orderedArray.push(0)
  }
  return orderedArray
}

/** SECOND DIRECTION MEANS : 👉 || 👇 */

function secondDirectionCalculation (nestedArray) {
  const ordererdSecondDirectionNestedArray = orderNestedArraySecondDirection(nestedArray)
  const [elem1, elem2, elem3, elem4] = ordererdSecondDirectionNestedArray

  if (elem4 === elem3 && elem4 !== 0) {
    return [0, elem1, elem2, 2 * elem4]
  } else if (elem3 === elem2 && elem3 !== 0) {
    return [0, elem1, 2 * elem3, elem4]
  } else if (elem2 === elem1 && elem2 !== 0) {
    return [0, 2 * elem2, elem3, elem4]
  }
  return ordererdSecondDirectionNestedArray
}

function orderNestedArraySecondDirection (nestedArray) {
  const orderedArray = nestedArray.filter(e => e !== 0)
  while (orderedArray.length < 4) {
    orderedArray.unshift(0)
  }
  return orderedArray
}

/** ***************************************************** */

function heightMovement (boardState, direction) {
  const invertedBoardState = boardInverter(boardState)

  const calculatedInvertedBoard = invertedBoardState.map(row => {
    if (hasRelevantValue(row)) {
      /** calcule de la ligne */
      switch (direction) {
        case UP:
          return firstDirectionCalculation(row)
        case DOWN:
          return secondDirectionCalculation(row)
        default:
          break
      }
    }
    return row
  })

  const calculatedBoard = boardInverter(calculatedInvertedBoard)

  return { board: calculatedBoard, hasChanged: !compareBoardState(boardState, calculatedBoard) }
}

function boardInverter (boardTab) {
  const invertedRow1 = []
  const invertedRow2 = []
  const invertedRow3 = []
  const invertedRow4 = []

  // eslint-disable-next-line
  boardTab.map(row => {
    invertedRow1.push(row[0])
    invertedRow2.push(row[1])
    invertedRow3.push(row[2])
    invertedRow4.push(row[3])
  })
  return [invertedRow1, invertedRow2, invertedRow3, invertedRow4]
}

function getNullValuePosition (boardTab) {
  const nullValuePosition = []
  // eslint-disable-next-line
  boardTab.map((row, indexRow) => {
    // eslint-disable-next-line
    row.map((value, indexValue) => {
      if (value === 0) {
        nullValuePosition.push({ x: indexRow, y: indexValue })
      }
    })
  })
  return nullValuePosition
}

function boardWithInsertedNewValue (board) {
  const nullValuePosition = getNullValuePosition(board)

  if (nullValuePosition.length === 0) {
    return {
      isLost: true,
      board
    }
  }

  let index = Math.floor(Math.random() * nullValuePosition.length) - 1

  if (index < 0) { index = 0 }

  board[nullValuePosition[index].x][nullValuePosition[index].y] = 2
  return { board }
}

export function compareBoardState (prevBoard, nextBoard) {
  const flattenedPrevBoard = flattenDeep(prevBoard)
  const flattenedNextBoard = flattenDeep(nextBoard)
  let isEqual = true

  flattenedPrevBoard.map((value, index) => {
    if (value !== flattenedNextBoard[index]) {
      isEqual = false
    }
  })

  return isEqual
}
