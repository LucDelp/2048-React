import { LEFT, RIGHT, UP, DOWN } from './boardAction'

export function boardReducer (boardState, action) {
  switch (action.type) {
    case LEFT:
      console.log('LEFT')
      return sideMovement(boardState, LEFT)
    case RIGHT:
      console.log('RIGHT')
      return sideMovement(boardState, RIGHT)
    case UP:
      console.log('UP')
      return heightMovement(boardState, UP)
    case DOWN:
      console.log('DOWN')
      return heightMovement(boardState, DOWN)
    default:
      return boardState
  }
}

function hasRelevantValue (nestedArray) {
  return undefined !== nestedArray.find(e => e !== 0)
}

function sideMovement (boardState, direction) {
  return boardState.map(row => {
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
}

/** FIRST DIRECTION MEANS : 👈 || 👆 */

function firstDirectionCalculation (nestedArray) {
  const calculatedNestedArray = []
  const ordererdFirstDirectionNestedArray = orderNestedArrayFirstDirection(nestedArray)
  const [elem1, elem2, elem3, elem4] = ordererdFirstDirectionNestedArray

  if (elem1 === elem2) {
    calculatedNestedArray.push(2 * elem1)
    calculatedNestedArray.push(elem3)
    calculatedNestedArray.push(elem4)
    calculatedNestedArray.push(0)

    return calculatedNestedArray
  } else if (elem2 === elem3) {
    calculatedNestedArray.push(elem1)
    calculatedNestedArray.push(2 * elem2)
    calculatedNestedArray.push(elem4)
    calculatedNestedArray.push(0)

    return calculatedNestedArray
  } else if (elem3 === elem4) {
    calculatedNestedArray.push(elem1)
    calculatedNestedArray.push(elem2)
    calculatedNestedArray.push(2 * elem3)
    calculatedNestedArray.push(0)

    return calculatedNestedArray
  }
  return calculatedNestedArray
}

function orderNestedArrayFirstDirection (nestedArray) {
  while (nestedArray[0] === 0) {
    nestedArray[0] = nestedArray[1]
    nestedArray[1] = nestedArray[2]
    nestedArray[2] = nestedArray[3]
    nestedArray[3] = 0
  }
  return nestedArray
}

/** SECOND DIRECTION MEANS : 👉 || 👇 */

function secondDirectionCalculation (nestedArray) {
  const calculatedNestedArray = []
  const ordererdSecondDirectionNestedArray = orderNestedArraySecondDirection(nestedArray)
  const [elem1, elem2, elem3, elem4] = ordererdSecondDirectionNestedArray

  if (elem4 === elem3) {
    calculatedNestedArray.unshift(2 * elem4)
    calculatedNestedArray.unshift(elem2)
    calculatedNestedArray.unshift(elem1)
    calculatedNestedArray.unshift(0)

    return calculatedNestedArray
  } else if (elem3 === elem2) {
    calculatedNestedArray.unshift(elem4)
    calculatedNestedArray.unshift(2 * elem3)
    calculatedNestedArray.unshift(elem1)
    calculatedNestedArray.unshift(0)

    return calculatedNestedArray
  } else if (elem2 === elem1) {
    calculatedNestedArray.unshift(elem4)
    calculatedNestedArray.unshift(elem3)
    calculatedNestedArray.unshift(2 * elem2)
    calculatedNestedArray.unshift(0)

    return calculatedNestedArray
  }
  return calculatedNestedArray
}

function orderNestedArraySecondDirection (nestedArray) {
  while (nestedArray[3] === 0) {
    nestedArray[3] = nestedArray[2]
    nestedArray[2] = nestedArray[1]
    nestedArray[1] = nestedArray[0]
    nestedArray[0] = 0
  }
  return nestedArray
}

/** ***************************************************** */

function heightMovement (boardState, direction) {
  /** Décomposer un colone */
  /** Recomposer en ligne */
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

  return boardInverter(calculatedInvertedBoard)
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
