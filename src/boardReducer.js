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
  return boardState.map((row, index) => {
    if (hasRelevantValue(row)) {
      /** calcule de la ligne */
      const newRow = []
      return newRow
    }
    return row
  })
}

function heightMovement (boardState, direction) {
  /** Décomposer un colone */
  /** Recomposer en ligne */
  return boardState
}
