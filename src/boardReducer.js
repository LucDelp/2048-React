import { LEFT, RIGHT, UP, DOWN } from './boardAction'
import { flattenDeep } from 'lodash'

export function boardReducer (boardState, action) {
  switch (action.type) {
    case LEFT:
      return sideMovement(boardState, LEFT)
    case RIGHT:
      return sideMovement(boardState, RIGHT)
    case UP:
      return heightMovement(boardState, UP)
    case DOWN:
      return heightMovement(boardState, DOWN)
    default:
      return boardState
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
  return boardWithAdderInspection(boardState, calculatedBoard)
}

/** FIRST DIRECTION MEANS : 👈 || 👆 */

function firstDirectionCalculation (nestedArray) {
  const calculatedNestedArray = []
  const ordererdFirstDirectionNestedArray = orderNestedArrayFirstDirection(nestedArray)
  const [elem1, elem2, elem3, elem4] = ordererdFirstDirectionNestedArray

  if (elem1 === elem2 && elem1 !== 0) {
    calculatedNestedArray.push(2 * elem1)
    calculatedNestedArray.push(elem3)
    calculatedNestedArray.push(elem4)
    calculatedNestedArray.push(0)

    return calculatedNestedArray
  } else if (elem2 === elem3 && elem2 !== 0) {
    calculatedNestedArray.push(elem1)
    calculatedNestedArray.push(2 * elem2)
    calculatedNestedArray.push(elem4)
    calculatedNestedArray.push(0)

    return calculatedNestedArray
  } else if (elem3 === elem4 && elem3 !== 0) {
    calculatedNestedArray.push(elem1)
    calculatedNestedArray.push(elem2)
    calculatedNestedArray.push(2 * elem3)
    calculatedNestedArray.push(0)

    return calculatedNestedArray
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
  const calculatedNestedArray = []
  const ordererdSecondDirectionNestedArray = orderNestedArraySecondDirection(nestedArray)
  const [elem1, elem2, elem3, elem4] = ordererdSecondDirectionNestedArray

  if (elem4 === elem3 && elem4 !== 0) {
    calculatedNestedArray.unshift(2 * elem4)
    calculatedNestedArray.unshift(elem2)
    calculatedNestedArray.unshift(elem1)
    calculatedNestedArray.unshift(0)

    return calculatedNestedArray
  } else if (elem3 === elem2 && elem3 !== 0) {
    calculatedNestedArray.unshift(elem4)
    calculatedNestedArray.unshift(2 * elem3)
    calculatedNestedArray.unshift(elem1)
    calculatedNestedArray.unshift(0)

    return calculatedNestedArray
  } else if (elem2 === elem1 && elem2 !== 0) {
    calculatedNestedArray.unshift(elem4)
    calculatedNestedArray.unshift(elem3)
    calculatedNestedArray.unshift(2 * elem2)
    calculatedNestedArray.unshift(0)

    return calculatedNestedArray
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

  return boardWithAdderInspection(boardState, calculatedBoard)
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
    console.log('gameOVER')
    return board
  }

  let index = Math.floor(Math.random() * nullValuePosition.length) - 1

  if (index < 0) { index = 0 }

  board[nullValuePosition[index].x][nullValuePosition[index].y] = 2
  console.log(board)
  return board
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

function boardWithAdderInspection (prevBoard, nextBoard) {
  if (compareBoardState(prevBoard, nextBoard)) {
    return prevBoard
  }
  return boardWithInsertedNewValue(nextBoard)
}
